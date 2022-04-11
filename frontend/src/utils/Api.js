class Api {
    constructor({
        address,
        token
    }) {
        this.address = address;
        this.token = token;
    }

    getUserInfo() {
        return fetch(`${this.address}/users/me`, {
                headers: {
                    authorization: this.token
                }
            })
            .then(res => this._checkResult(res))
    }

    getCards() {
        return fetch(`${this.address}/cards`, {
                headers: {
                    authorization: this.token
                }
            })
            .then(res => this._checkResult(res))
    }

    addNewCard(data) {
        return fetch(`${this.address}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => this._checkResult(res))
    }

    setUserInfo(data) {
        return fetch(`${this.address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(res => this._checkResult(res))
    }

    setUserAvatar(data) {
        return fetch(`${this.address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(res => this._checkResult(res))
    }

    deleteCard(cardId) {
        return fetch(`${this.address}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => this._checkResult(res))
    }

    changeLikeCardStatus(cardId, isNotLiked) {
        if (isNotLiked) {
        return fetch(`${this.address}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => this._checkResult(res))
        } else {
            return fetch(`${this.address}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => this._checkResult(res))
        }
    }

    _checkResult(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }
}

const configK = {
    address: 'https://mesto.nomoreparties.co/v1/cohort-32',
    token: 'e7c53c8e-b5d8-4719-b07e-61d4790752fd'
}

const api = new Api(configK);
export default api;