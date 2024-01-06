const Errors = {
    NotFound : {name: 'NotFound', message: 'Not Found'},
    Empty: { name: 'Empty', message: 'Empty' },
    AuthTokenInvalid : {name: 'AuthTokenInvalid', message: 'Auth Token Invalid'},
    PermissionDenied: { name: 'PermissionDenied', message: 'Permission denied' },
    EmailInvalid: { name: 'EmailInvalid', message: 'Email address invalid' },
    EmailExist: { name: 'EmailExist', message: 'Email already exists' },
    EmailNotExist: { name: 'EmailExist', message: 'Email not exists' },
    PasswordNotMatch: { name: 'PasswordNotMatch', message: 'Password not match' },
    AuthTokenRequired: { name: 'AuthTokenRequired', message: 'Authentication token required' },
}

export default Errors