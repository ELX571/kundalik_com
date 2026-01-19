from kundalik.users.for_admin import Admin, command_admin


def main():
    print("Assalomu alaykum")

    user = login()

    if user.user_type is None:
        raise Exception("SIZGA HECH QANDAY ROL BERILMAGAN")

    print(f"Tizimga Hush kelibsiz: {user.full_name}")

    if user.user_type == UserType.STUDENT:
        print("\nQaysi bo'limga kirmoqchisiz:")
        for raqam, malumot in command_bolim.items():
            print(f"{raqam} -> {malumot}")
    elif user.user_type == UserType.ADMIN:
        print("\nAdmin boshqaruv paneli:")
        for raqam, malumot in command_admin.items():
            print(f"{raqam} -> {malumot}")

    admin_obj = Admin(user)
    student_obj = Student(user)

    while True:
        cmd = input('\nBuyruq kodini kiriting >> ')

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
            student_obj.run(cmd)

        elif user.user_type == UserType.ADMIN:
            admin_obj.run(cmd)




if __name__ == "__main__":
    main()