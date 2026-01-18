from kundalik.main_control.login import login
from kundalik.comands.comands_student import command_bolim
from kundalik.main_control.user import UserType
from kundalik.users.teacher import for_teacher
from kundalik.users.for_student import Student


def main():
    print("Assalomu alaykum")
    user = login()

    if user.user_type is None:
        raise Exception("SIZGA HECH QANDAY ROL BERILMAGAN")

    print(f"Tizimga Hush kelibsiz: {user.full_name}")

    if user.user_type == UserType.STUDENT:
        print("Qaysi bo‘limga kirmoqchisiz:")
        for raqam, malumot in command_bolim.items():
            print(f"{raqam} -> {malumot}")

    while True:
        cmd = input('Buyruq kodini kiriting >> ')

        if not cmd.isdigit():
            print('Faqat raqam kiritishingiz mumkin!')
            continue

        cmd = int(cmd)

        if cmd == 0:
            print("\nDastur yakunlandi!")
            break

        if user.user_type == UserType.TEACHER:
            for_teacher(cmd, user)


        elif user.user_type == UserType.STUDENT:
            student_obj = Student(user)
            student_obj.run(cmd)




if __name__ == "__main__":
    main()