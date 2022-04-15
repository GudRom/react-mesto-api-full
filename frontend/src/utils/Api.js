class Api {
    constructor({ address }) {
        this.address = address;
    }

    getToken = () => {
        return `Bearer ${localStorage.getItem('jwt')}`;
    }

    getUserInfo() {
        return fetch(`${this.address}/users/me`, {
                headers: {
                    authorization: this.getToken(),
                }
            })
            .then(res => this._checkResult(res))
    }

    getCards() {
        return fetch(`${this.address}/cards`, {
                headers: {
                    authorization: this.getToken(),
                }
            })
            .then(res => this._checkResult(res))
    }

    addNewCard(data) {
        return fetch(`${this.address}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.getToken(),
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
                authorization: this.getToken(),
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
                authorization: this.getToken(),
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
                    authorization: this.getToken(),
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
                    authorization: this.getToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then(res => this._checkResult(res))
        } else {
            return fetch(`${this.address}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    authorization: this.getToken(),
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
    address: 'https://api.themestechko.students.nomoredomains.work',
}

const api = new Api(configK);
export default api;