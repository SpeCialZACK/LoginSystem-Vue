<template>
    <div>
        <button @click="goHome">返回首頁</button>
        <h2>修改密碼</h2>
        <input v-model="oldPassword" placeholder="舊密碼" type="password" />
        <br />
        <input v-model="newPassword" placeholder="新密碼" type="password" />
        <br />
        <button @click="changePassword">確認修改</button>
        <p>{{ message }}</p>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import api from '../services/api' // 後端API參數設定
    import { useRouter } from 'vue-router'

    // 取得 token
    const token = localStorage.getItem('token')

    // 路徑
    const router = useRouter()

    // 新舊密碼
    const oldPassword = ref('')
    const newPassword = ref('')

    // 訊息
    const message = ref('')

    // 修改密碼函式
    async function changePassword() {
        try {
            const username = localStorage.getItem('username')

            const response = await api.post('/user/change-password', {
                username: username,
                oldPassword: oldPassword.value,
                newPassword: newPassword.value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            message.value = '密碼修改成功！'
        } catch (error) {
            message.value = '密碼修改失敗：' + (error.response?.data || '發生錯誤')
            // console.error(error)
        }
    }

    function goHome() {
        router.push('/home')
    }
</script>