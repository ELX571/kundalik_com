from kundalik.database.utils import load_students

about_students = load_students()

if not about_students:
    about_students = {
        'subjects': {
            1: "Matematika",
            2: "Ona tili",
            3: "Tarix"
        },
        1: {
            'name': 'Saidazimxon Ismoilov',
            'birthday': '19.03.2007',
            'grades': {
                1: 0,
                2: 0,
                3: 0
            }
        },
        2: {
            'name': 'Ali Valiyev',
            'birthday': '12.04.2007',
            'grades': {
                1: 0,
                2: 0,
                3: 0
            }
        },

        3: {
            'name': 'Nosirjonov Nurbek',
            'birthday': '15.07.2007',
            'grades': {
                1: 0,
                2: 0,
                3: 0
            }
        }
    }
extra_class = {
    1: {

        'code': '1111',
        'name': 'Saidazimxon Ismoilow',
        'lesson': {'math': {'Monday': '11:30', 'Wednesday': '11:30', 'Friday': '11:30'},
                   'history':{'Tuesday':'14:00','Thursday':'14:00','Saturday':'14:00'}}

    },

    2: {

        'code': '2222',
        'name': 'Ali Valiyev',
        'lesson': {'English': {'Monday': '15:30', 'Wednesday': '15:30', 'Friday': '15:30'},
                   'IT': {'Tuesday': '12:00', 'Thursday': '12:00', 'Saturday': '12:00'}}
    },

    3: {

        'code': '2222',
        'name': 'Ali Valiyev',
        'lesson': {'Geography': {'Monday': '19:30', 'Wednesday': '19:30', 'Friday': '19:30'},
                   'Science': {'Tuesday': '9:00', 'Thursday': '9:00', 'Saturday': '9:00'}}
    }
}