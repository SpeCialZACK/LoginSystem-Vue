<template>
    <div>
        <h2>使用者登入</h2>
        <input v-model="username" placeholder="帳號" />
        <br />
        <input v-model="password" placeholder="密碼" type="password" />
        <br />
        <button @click="login">登入</button>
        <p>{{ message }}</p>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import api from '../services/api' // 後端API參數設定
    import { useRouter } from 'vue-router'

    // 路徑
    const router = useRouter()

    // 帳號密碼
    const username = ref('')
    const password = ref('')

    // 訊息
    const message = ref('')

    // 登入函式
    async function login() {
        try {
            const response = await api.post('/user/login', {
                username: username.value,
                password: password.value
            })

            const token = response.data.token
            // console.log('拿到的 token：', token)

            // 儲存帳號和 token
            localStorage.setItem('username', username.value)
            localStorage.setItem('token', token)

            // 導向主畫面
            router.push('/home')
        } catch (error) {
            message.value = '登入失敗：' + (error.response?.data || '伺服器錯誤')
            // console.error(error)

            setTimeout(() => {
                message.value = ''
            }, 3000)
        }
    }
</script>