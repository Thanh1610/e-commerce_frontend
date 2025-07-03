import UserInfoTable from '@/components/UserInfoTable/UserInfoTable';
function ProfilePage() {
    return (
        <div className="container mx-auto my-0 max-w-screen-lg px-2 sm:px-4">
            <h3 className="py-3.5 text-xl font-bold sm:text-2xl">Thông tin tài khoản</h3>
            <UserInfoTable />
        </div>
    );
}

export default ProfilePage;
