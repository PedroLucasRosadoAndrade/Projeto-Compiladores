def truncar_nota(valor):
    return int(valor * 10) / 10


def avaliar_Aluno(n1, n2):
    nota_final = round(n1 + n2, 1)

    if nota_final < 0.0 or nota_final > 10.0:
        situacao = "Nota inválida."
    elif nota_final < 4.0:
        situacao = "Reprovado."
    elif nota_final < 7.0:
        situacao = "Recuperação."
    else:
        situacao = "Aprovado."

    return nota_final, situacao


def ler_nota(mensagem):
    nota = float(input(mensagem).replace(",", "."))

    while nota < 0.0 or nota > 10.0:
        nota = float(input("Nota inválida. Por favor, digite novamente: ").replace(",", "."))

    return truncar_nota(nota)


def main():
    continuar = "S"

    while continuar.strip().upper() == "S":
        nome = input("Informe o nome do aluno(a): ")
        n1 = ler_nota("Informe a nota N1: ")
        n2 = ler_nota("Informe a nota N2: ")

        nota_final, situacao = avaliar_Aluno(n1, n2)

        print(f"\nNome do aluno(a): {nome}")
        print(f"N1: {n1:.1f}")
        print(f"N2: {n2:.1f}")
        print(f"Nota final: {nota_final:.1f}")
        print(f"Situação: {situacao}")

        continuar = input('Deseja continuar consultando notas? (Clique "S" para continuar): ')
        print()


if __name__ == "__main__":
    main()