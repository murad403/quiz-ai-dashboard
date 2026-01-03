/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';

const LogoutModal = () => {
    const router = useRouter();
    const handleLogout = () => {
        (document.getElementById('my_modal_1') as HTMLDialogElement)?.close();
    };
    return (
        <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-main shadow-xl rounded-xl p-5">

                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-red-100 rounded-full">
                        <FiLogOut size={40} className="text-red-600" />
                    </div>
                </div>

                <h3 className="text-black text-heading font-semibold text-center mb-3">
                    Logout Confirmation
                </h3>
                <p className="text-gray-700 text-center text-normal mb-8">
                    Are you sure you want to log out of your account?
                </p>


                <div className="modal-action flex justify-center gap-10">

                    <form method="dialog">
                        <button className="border border-gray-700/50 py-2 px-6 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium">
                            Cancel
                        </button>
                    </form>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 rounded-lg py-2 px-6 text-white font-medium transition"
                    >
                        Yes, Logout
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default LogoutModal