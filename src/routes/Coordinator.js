export const goToLogin = (history) => {
    history.push('/sharkeddit/login')
}
export const goToSignUp = (history) => {
    history.push('/sharkeddit/cadastro')
}
export const goToFeed = (history) => {
    history.push('/sharkeddit/feed')
}
export const goToPost = (history, id) => {
    history.push(`/sharkeddit/feed/${id}`)
}
