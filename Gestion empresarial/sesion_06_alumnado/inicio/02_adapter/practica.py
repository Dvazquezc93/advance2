from abc import ABC, abstractmethod


class Notificador(ABC):
    @abstractmethod
    def enviar(self, destino: str, mensaje: str) -> None:
        pass


class CorreoAntiguo:
    def __init__(self):
        self.enviados: list[dict[str, str]] = []

    def send(self, payload: dict[str, str]) -> str:
        self.enviados.append(payload)
        return f"Correo enviado a {payload['to']}"


class AdaptadorCorreo(Notificador):
    def __init__(self, correo: CorreoAntiguo):
        self.correo = correo

    def enviar(self, destino: str, mensaje: str) -> None:
        print(self.correo.send({"to": destino, "body": mensaje}))


class SmsExterno:
    def __init__(self):
        self.enviados: list[tuple[str, str]] = []

    def publicar(self, numero: str, contenido: str) -> None:
        self.enviados.append((numero, contenido))


class AdaptadorSms(Notificador):
    def __init__(self, sms: SmsExterno):
        self.sms = sms

    def enviar(self, destino: str, mensaje: str) -> None:
        self.sms.publicar(destino, mensaje)
        print(f"SMS enviado a {destino}")


def avisar(notificador: Notificador, destino: str) -> None:
    notificador.enviar(destino, "Pedido confirmado")


def main() -> None:
    correo = CorreoAntiguo()
    avisar(AdaptadorCorreo(correo), "aula@ejemplo.test")
    print(correo.enviados)

    sms = SmsExterno()
    avisar(AdaptadorSms(sms), "600123123")
    print(sms.enviados)


if __name__ == "__main__":
    main()
