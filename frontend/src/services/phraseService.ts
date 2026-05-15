const mockPhrase = "Organização é o primeiro passo para a produtividade"

export const phraseService = {
    async getDailyPhrase(): Promise<string> {
        return mockPhrase
    }
}