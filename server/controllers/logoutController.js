




const UserLogoutFunction = async (req, res) => {
    try {
        res.clearCookie('authToken')
        return res.status(200).json({ message: 'User Has Logged Out'})
    }catch(error) {
            console.error('Logout error', error)
            return res.status(500).json({ message: 'Failed to log out. Please try again.'})
    }
}


export default UserLogoutFunction