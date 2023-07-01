import { useState } from "react";
import { postCreatUser } from "../service/UserService";
import { toast } from 'react-toastify';

export default function Model(props) {
    const { handleUpdateTable } = props
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleSaveUser = async (name, job) => {
        let res = await postCreatUser(name, job)
        if (res && res.id) {
            setShowModal(false)
            setName('')
            setJob('')
            toast.success("A user was created successfully")
            handleUpdateTable({ first_name: name, id: res.id, email: job })
        } else {
            toast.error("An error occurred while creating")
        }
    }
    return (
        <>
            <div className="flex items-center mt-20 justify-between mx-40">
                <span className="font-bold">List Users:</span>
                <button
                    className="px-6 py-3 text-purple-100 bg-purple-600 rounded-md"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Add new user
                </button>
            </div>
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 sm:flex">
                                    <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-400 rounded-full">
                                    </div>
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg font-medium text-gray-800">
                                            Add user
                                        </h4>
                                        <h1 className="form-control">Name</h1>
                                        <input
                                            className="border-2 boder-gray-900 w-full p-1"
                                            type="text"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                        <h1>Email</h1>
                                        <input
                                            className="border-2 boder-gray-900 w-full p-1"
                                            type="text"
                                            value={job}
                                            onChange={(event) => setJob(event.target.value)}

                                        />
                                        <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                            Please enter the correct format
                                            and pay attention to the gmail
                                            section
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                                onClick={() =>
                                                    handleSaveUser()
                                                }
                                            >
                                                Add
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}