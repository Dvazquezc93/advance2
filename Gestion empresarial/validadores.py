def validar_cif(cif:str)->None
    if (len(cif)!= 9 or cif.startswith("A","B") or not cif[1:].isascii() or not cif[1:].isdigit()):
        raise ValueError ("Se espera A o B seguido de 8 números")