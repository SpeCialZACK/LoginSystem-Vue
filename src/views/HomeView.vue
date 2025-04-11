<template>
    <div>
        <h2>
            歡迎，{{ username }}
            <button @click="logout" style="margin-left: 20px;">登出</button>
        </h2>

        <p>請選擇功能：</p>
        <ul>
            <li><button @click="goToChangePassword">修改密碼</button></li>
            <li><button @click="goToUserManagement">使用者管理</button></li>
        </ul>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'

    // 路徑
    const router = useRouter()

    // 帳號
    const username = ref('')

    // 初次載入時叫用，嘗試從 localStorage 拿登入資訊
    onMounted(() => {
        const savedUsername = localStorage.getItem('username')
        if (savedUsername) {
            username.value = savedUsername
        } else {
            // 如果沒有登入紀錄，就跳回登入頁
            router.push('/login')
        }
    })

    function goToChangePassword() {
        router.push('/change-password')
    }

    function goToUserManagement() {
        router.push('/user-management')
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        router.push('/login')
    }
</script>