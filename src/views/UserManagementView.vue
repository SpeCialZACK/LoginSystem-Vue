<template>
    <div>
        <button @click="goHome">返回首頁</button>
        <h2>使用者清單</h2>

        <!-- 新增使用者區塊 -->
        <div style="margin-bottom: 20px;">
            <h3>新增使用者</h3>
            <input v-model="newUsername" placeholder="帳號" />
            <input v-model="newPassword" placeholder="密碼" type="password" />
            <input v-model="newFullName" placeholder="姓名" />
            <button @click="createUser">新增</button>
        </div>

        <!-- 使用者清單表格 -->
        <table border="1" cellpadding="5" align="center">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>帳號</th>
                    <th>姓名</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.username }}</td>
                    <td>
                        <template v-if="editingId === user.id">
                            <input v-model="editFullName" />
                        </template>
                        <template v-else>
                            {{ user.fullName }}
                        </template>
                    </td>
                    <td>
                        <template v-if="editingId === user.id">
                            <button @click="saveEdit(user.id)">儲存</button>
                            <button @click="cancelEdit">取消</button>
                        </template>
                        <template v-else>
                            <button @click="startEdit(user)">修改姓名</button>
                            <button @click="deleteUser(user.id)">刪除</button>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>

        <p style="color: green">{{ Message }}</p>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import api from '../services/api' // 後端API參數設定
    import { useRouter } from 'vue-router'

    // 取得 token
    const token = localStorage.getItem('token')

    // 路徑
    const router = useRouter()

    // 所有使用者
    const users = ref([])

    // 訊息
    const Message = ref('')

    // 新增使用者表單資料
    const newUsername = ref('')
    const newPassword = ref('')
    const newFullName = ref('')

    // 
    const editingId = ref(null)
    const editFullName = ref('')

    // 初次載入時叫用：取得所有使用者函式
    onMounted(loadUsers)

    // 取得所有使用者函式
    async function loadUsers() {
        try {
            const res = await api.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            users.value = res.data
        } catch (err) {
            Message.value = '載入使用者失敗：' + (err.response?.data || '發生錯誤')
            // console.error(err)
        }
    }

    // 新增使用者函式
    async function createUser() {
        try {
            const res = await api.post('/user', {
                username: newUsername.value,
                password: newPassword.value,
                fullName: newFullName.value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            Message.value = '新增成功！'

            // 清空欄位
            newUsername.value = ''
            newPassword.value = ''
            newFullName.value = ''

            // 重新載入列表
            await loadUsers()
        } catch (err) {
            Message.value = '新增失敗：' + (err.response?.data || '發生錯誤')
            // console.error(err)
        }
    }

    // 修改姓名按鈕
    function startEdit(user) {
        editingId.value = user.id
        editFullName.value = user.fullName
    }

    // 取消按鈕
    function cancelEdit() {
        editingId.value = null
        editFullName.value = ''
    }

    // 儲存按鈕
    async function saveEdit(id) {
        try {
            await api.put(`/user/${id}`, {
                fullName: editFullName.value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            Message.value = '更新成功！'
            await loadUsers()
            cancelEdit()
        } catch (err) {
            Message.value = '更新失敗：' + (err.response?.data || '伺服器錯誤')
            // console.error(err)
        }
    }

    // 刪除使用者函式
    async function deleteUser(id) {
        const confirmDelete = confirm('確定要刪除這個使用者嗎？')
        if (!confirmDelete) return

        try {
            await api.delete(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            Message.value = '刪除成功！'
            await loadUsers() // 重新載入資料
        } catch (err) {
            Message.value = '刪除失敗：' + (err.response?.data || '發生錯誤')
            // console.error(err)
        }
    }

    function goHome() {
        router.push('/home')
    }
</script>