export default {
  translation: {
    app: {
      signOut: 'Выйти',
      chat: 'Hexlet Chat',
    },
    chatPage: {
      messages_zero: '{{count}} сообщений',
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
      ariaLabel: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      send: 'Отправить',
    },
    errorPage: {
      h1text: 'Страница не найдена',
      ptext: 'Но вы можете перейти ',
      textLink: 'на главную страницу',
    },
    loginPage: {
      toastError: 'Ошибка соединения',
      h1text: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      invalid: 'Неверные имя пользователя или пароль',
      textFooter: 'Нет аккаунта? ',
      linkFooter: 'Регистрация',
    },
    signupPage: {
      schemaValidation: {
        minUser: 'От 3 до 20 символов',
        maxUser: 'От 3 до 20 символов',
        userExists: 'Такой пользователь уже существует',
        required: 'Обязательное поле',
        minPassword: 'Не менее 6 символов',
        PasMustMatch: 'Пароли должны совпадать',
      },
      h1text: 'Регистрация',
      userLabel: 'Имя пользователя',
      passLabel: 'Пароль',
      userPlaceholder: 'От 3 до 20 символов',
      passPlaceholder: 'Не менее 6 символов',
      confPassPlaceholder: 'Пароли должны совпадать',
      confPassLabel: 'Подтвердите пароль',
      signButton: 'Зарегистрироваться',
    },
    modals: {
      add: {
        schemaValidation: {
          required: 'Обязательное поле',
          min: 'От 3 до 20 символов',
          max: 'От 3 до 20 символов',
          uniqueName: 'Должно быть уникальным',
        },
        succesAddChannel: 'Канал создан',
        modalChannel: 'Добавить канал',
        labelChannelName: 'Имя канала',
        buttonCanсel: 'Отменить',
        buttonSubmit: 'Отправить',
      },
      remove: {
        modalTitle: 'Удалить канал',
        succesDelChannel: 'Канал удален',
        confDelete: 'Уверены?',
        buttonCanсel: 'Отменить',
        buttonSubmit: 'Удалить',
      },
      rename: {
        schemaValidation: {
          min: 'От 3 до 20 символов',
          max: 'От 3 до 20 символов',
          uniqueName: 'Должно быть уникальным',
        },
        succesRenameChannel: 'Канал переименован',
        succesErrorChannel: 'Не удалось переименовать канал',
        modalTitle: 'Добавить канал',
        labelChannelName: 'Имя канала',
        buttonCanсel: 'Отменить',
        buttonSubmit: 'Отправить',
      },
    },
    chat: {
      channel: {
        visuallHidden: 'Управление каналом',
        dropdownDel: 'Удалить',
        dropdownRename: 'Переименовать',
      },
      channels: {
        channels: 'Каналы',
      },
    },
  },
};
