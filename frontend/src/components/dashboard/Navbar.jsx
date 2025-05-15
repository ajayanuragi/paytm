import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserAvatar } from "../profile/UserAvatar";
import { UserDropdown } from "../profile/UserDropdown";

export function Navbar({ user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = useCallback(
    () => setIsDropdownOpen((prev) => !prev),
    []
  );
  const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);

  const handleEditProfile = useCallback(() => {
    closeDropdown();
    navigate("/edit-profile");
  }, [navigate, closeDropdown]);
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/signin");
  }, [navigate]);

  const handleClickOutside = useCallback(
    (e) => {
      if (!e.target.closest(".dropdown-container")) {
        closeDropdown();
      }
    },
    [closeDropdown]
  );

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen, handleClickOutside]);
  return (
    <div className="flex items-center justify-between px-4 py-2 md:p-8 shadow-xs md:shadow-lg relative">
      <div className="font-normal md:text-3xl md:font-extrabold">
        Payments App
      </div>
      <div className="flex items-center gap-2 dropdown-container relative">
        <div className="text-xs md:text-lg">Hello, {user?.firstName}</div>

        <UserAvatar user={user} onClick={toggleDropdown} />

        {isDropdownOpen && (
          <UserDropdown
            user={user}
            onClose={closeDropdown}
            onLogout={handleLogout}
            onEditProfile={handleEditProfile}
          />
        )}
      </div>
    </div>
  );
}
