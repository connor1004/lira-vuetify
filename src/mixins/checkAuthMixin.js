const checkAuthMixin = {
    data() {
        return {
            userData: null
        }
    },
    created() {
        this.checkStorageForUser();
    },
    methods: {
        checkStorageForUser() {
            if (localStorage.userData) {
                this.userData = JSON.parse(localStorage.getItem("userData"));
            }
        },
    }
};

export default checkAuthMixin;