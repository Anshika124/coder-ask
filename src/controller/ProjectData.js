export const isDebug = true;

function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export function generateUser() {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva'];
    const domains = ['gmail.com', 'hotmail.com', 'test.com'];
    
    const name = names[Math.floor(Math.random() * names.length)];
    const maxUsernameLength = 10;
    const remainingLength = maxUsernameLength - name.length;
    const randomPart = remainingLength > 0 ? generateRandomString(remainingLength) : '';
    
    const username = (name + randomPart).toLowerCase();
    const email = `${username}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const password = generateRandomString(12);

    return {
        name: name,
        username: username,
        email: email,
        password: password
    };
}
