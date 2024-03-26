export function toOAuthPage(serviceId: string, redirectURI: string): void {
  globalThis.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectURI}`
}
