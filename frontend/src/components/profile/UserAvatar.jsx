export const UserAvatar = ({ user, onClick }) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <div className="bg-black rounded-full text-white w-6 h-6 flex items-center justify-center md:w-10 md:h-10 md:p-2 cursor-pointer">
        <div>{user?.firstName?.[0]}</div>
      </div>
    </div>
  );
};
