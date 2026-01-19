
from kundalik.main_control.user import User, UserType
# admin = Admin()
#  Add_teacher
# admin.add_teacher()  # user1
# admin.add_teacher()  # user2
# admin.add_teacher()  # user3


class Admin:
    def __init__(self, user: User):
        self.user = user

    def add_teacher(self):
        print('\n--- O\'qituvchi qo\'shish ---')
        self._add_user(UserType.TEACHER)

    def add_student(self):
        print('\n--- O\'quvchi qo\'shish ---')
        self._add_user(UserType.STUDENT)

    def _add_user(self, user_type):
        username = input("Username >>> ").lower()
        password = input("Parol (4 ta raqam) >>> ")
        first_name = input("Ism >>> ").title()
        last_name = input("Familiya >>> ").title()
        middle_name = input("Otasining ismi (ovich/ovna) >>> ").lower()
        birth_date = input("Tug'ilgan sana (DD.MM.YYYY) >>> ")

        # ----------- vaildation ----------
        if len(password) != 4 or not password.isdigit():
            print('( ERROR ) Parol 4 ta raqamdan iborat bo\'lishi kerak!')
            return

        if len(birth_date) != 10:
            print('( ERROR ) Tug\'ilgan sana noto\'g\'ri!')
            return

        if not middle_name.endswith(("ovich", "ovna")):
            print("( ERROR ) Otasining ismi 'ovich' yoki 'ovna' bilan tugashi shart!")
            return

        try:
            new_user = User(
                username=username,
                password=password,
                first_name=first_name,
                last_name=last_name,
                middle_name=middle_name,
                birth_date=birth_date,
                user_type=user_type
            )
            print(f"( SUCCESS ) {user_type.title()} {new_user.full_name} qo'shildi (ID: {new_user.id})")
        except Exception as e:
            print(f"( ERROR ) {e}")

    def list_users(self):
        print("\n--- Barcha Foydalanuvchilar ---")
        if not User._instances:
            print("Foydalanuvchilar mavjud emas.")
            return
        
        for user_id, user in User._instances.items():
            print(f"ID: {user_id} | {user.user_type.upper()} | {user.full_name} (@{user.username})")

    def run(self, cmd):
        if cmd == 1:
            self.add_teacher()
        elif cmd == 2:
            self.add_student()
        elif cmd == 3:
            self.list_users()
        else:
            print("Bunday buyruq mavjud emas!")

# Commands for Admin
command_admin = {
    1: "O'qituvchi qo'shish",
    2: "O'quvchi qo'shish",
    3: "Foydalanuvchilar ro'yxati",
    0: "Chiqish"
}









