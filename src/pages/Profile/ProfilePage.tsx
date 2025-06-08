import UserInfoTable from '@/components/UserInfoTable/UserInfoTable';
function ProfilePage() {
    return (
        <div className="container mx-auto my-0 max-w-screen-lg">
            <h3 className="py-3.5 text-2xl font-bold">Thông tin tài khoản</h3>
            <UserInfoTable />
        </div>
    );
}

export default ProfilePage;
