export default {
  translation: {
    app: {
      signOut: 'Exit',
      chat: 'Hexlet Chat',
    },
    chatPage: {
      messages_zero: '{{count}} messages',
      messages_one: '{{count}} message',
      messages_few: '{{count}} messages',
      messages_many: '{{count}} messages',
      ariaLabel: 'New message',
      placeholder: 'Enter a message...',
      send: 'Send',
    },
    errorPage: {
      h1text: 'Page not found',
      ptext: 'But you can go to the ',
      textLink: 'main page',
    },
    loginPage: {
      toastError: 'Connection Error',
      h1text: 'Log in',
      username: 'Your nickname',
      password: 'Password',
      invalid: 'Invalid username or password',
      textFooter: 'No account? ',
      linkFooter: 'Registration',
    },
    signupPage: {
      schemaValidation: {
        minUser: 'From 3 to 20 characters',
        maxUser: 'From 3 to 20 characters',
        userExists: 'This user already exists',
        required: 'Required field',
        minPassword: 'At least 6 characters',
        PasMustMatch: 'Passwords must match',
      },
      h1text: 'Registration',
      userLabel: 'Username',
      passLabel: 'Password',
      userPlaceholder: 'From 3 to 20 characters',
      passPlaceholder: 'At least 6 characters',
      confPassPlaceholder: 'Passwords must match',
      confPassLabel: 'Confirm password',
      signButton: 'Register',
    },
    modals: {
      add: {
        schemaValidation: {
          required: 'Required field',
          min: 'From 3 to 20 characters',
          max: 'From 3 to 20 characters',
          uniqueName: 'Must be unique',
        },
        succesAddChannel: 'Channel created',
        modalChannel: 'Add channel',
        labelChannelName: 'Channel Name',
        buttonCanсel: 'Cancel',
        buttonSubmit: 'Send',
      },
      remove: {
        modalTitle: 'Delete channel',
        succesDelChannel: 'Channel removed',
        confDelete: 'Are you sure?',
        buttonCanсel: 'Cancel',
        buttonSubmit: 'Delete',
      },
      rename: {
        schemaValidation: {
          min: 'From 3 to 20 characters',
          max: 'From 3 to 20 characters',
          uniqueName: 'Must be unique',
        },
        succesRenameChannel: 'Channel renamed',
        succesErrorChannel: 'Failed to rename a channel',
        modalTitle: 'Add channel',
        labelChannelName: 'Channel Name',
        buttonCanсel: 'Cancel',
        buttonSubmit: 'Send',
      },
    },
    chat: {
      channel: {
        visuallHidden: 'Channel management',
        dropdownDel: 'Delete',
        dropdownRename: 'Rename',
      },
      channels: {
        channels: 'Channels',
      },
    },
  },
};
