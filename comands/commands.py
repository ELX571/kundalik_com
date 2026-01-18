

def command_handler_teacher(command):
    command={

        0 : 'Dasturni yakunlash',
        1 : 'Oquvchilaringizni korishingiz mumkun',
        2 : 'Baholash tizimiga kirishingiz mumkun',
        3 : 'Oquvchilarni darsdan chetlashtirish',

    }
    for c_keys,c_values in command.items():
        print(f'{c_keys} -> {c_values}')
    return command