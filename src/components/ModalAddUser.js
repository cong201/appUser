import { Fragment, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { postCreatUser } from '../service/UserService'
import { toast } from 'react-toastify'

const ModalAddUser = (props) => {
    const { open, handelClose, handleUpdateTable } = props
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleSaveUser = async () => {
        let res = await postCreatUser(name, job)
        if (res && res.id) {
            handelClose()
            setJob('')
            setName('')
            toast.success("A user has been created")
            handleUpdateTable({ first_name: name, id: res.id })
        } else {
            toast.error("Opp..., Error")
        }

    }

    return (
        <Fragment>
            <Dialog open={open} handler={handelClose}>
                <DialogHeader>Add more User</DialogHeader>
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
                    <Button variant="gradient" className="bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleSaveUser()}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}

export default ModalAddUser