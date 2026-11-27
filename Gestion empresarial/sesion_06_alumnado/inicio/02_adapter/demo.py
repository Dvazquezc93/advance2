from abc import ABC, abstractmethod

class Notificador(ABC):
    @abstractmethod
    def enviar(self, destino:str,texto:str)->None:
        pass

class CorreoAntiguo:
    def __init__(self):
        self.enviados: list[dict[str,str]]=[]

    def send_message(self, payload:dict)->str:
        self.enviados.append(payload)
        return"Envio Correcto"

class AdaptadorCorreo(Notificador):
    def __init__(self, servicio: CorreoAntiguo):
        self.servicio = servicio

    def enviar(self, destino: str, texto: str) -> None:
        payload = {"to": destino, "body": texto}
        print(self.servicio.send_message(payload))


def avisar(notificador: Notificador, destino: str) -> None:
    notificador.enviar(destino, "Pedido Confirmado")


class SmsExterno:
    def __init__(self):
        self.enviados: list[tuple[str, str]] = []

    def publicar(self, numero: str, contenido: str) -> None:
        self.enviados.append((numero, contenido))


class AdaptadorSms(Notificador):
    def __init__(self, servicio: SmsExterno):
        self.servicio = servicio

    def enviar(self, destino: str, texto: str) -> None:
        self.servicio.publicar(destino, texto)


def main() -> None:
    servicio_correo = CorreoAntiguo()
    avisar(AdaptadorCorreo(servicio_correo), "aula@example.com")
    print(servicio_correo.enviados)

    servicio_sms = SmsExterno()
    avisar(AdaptadorSms(servicio_sms), "653551561")
    print(servicio_sms.enviados)


if __name__ == "__main__":
    main()
