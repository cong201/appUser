import { Fragment, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { putUpdateUser } from '../service/UserService'
import { toast } from 'react-toastify'

const ModalEditUser = (props) => {
    const { open, handelClose, dataUserEdit, handleEditUserFromModal } = props
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job)
        if (res && res.updatedAt) {
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            })
            handelClose()
            toast.success("Update user successfully")
        }
    }
    useEffect(() => {
        if (open) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])
    return (
        <Fragment>
            <Dialog open={open}>
                <DialogHeader>Edit a user</DialogHeader>
                <DialogBody divider>
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            className="border border-gray-900 w-full"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            className="border border-gray-900 w-full"
                            type="text"
                            value={job}
                            onChange={(event) => setJob(event.target.value)}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        onClick={handelClose}
                        className="mr-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        className="bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleEditUser()}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}

export default ModalEditUser