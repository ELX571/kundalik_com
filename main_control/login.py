from kundalik.main_control.user import User,UserType



def check_credentials(username, password) -> User | None:
    all_users = User._instances.values()
    for user in all_users:
        if username == user.username and password == user.password:
            return user
    print("\033[91mUsername yoki Parol xato!!!\033[0m")


def login() -> User:
    user = UserType
    while not isinstance(user, User):
        username = input("username-ni kiriting: ")
        password = input("password-ni kiriting: ")
        user = check_credentials(username, password)
    return user



