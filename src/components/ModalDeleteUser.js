import { Fragment } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { deleteUser } from "../service/UserService"
import { toast } from 'react-toastify'

const ModalDeleteUser = (props) => {
    const { open, handelClose, dataUserDelete, handelDeleteUserFromModal } = props

    const handelDelete = async () => {
        let res = await deleteUser(dataUserDelete.id)
        if (res && +res.statusCode === 204) {
            toast.success("Deleted successfully")
            handelClose()
            handelDeleteUserFromModal(dataUserDelete)
        } else {
            toast.error("Couldn't delete")
        }
        console.log("check", res);
    }

    return (
        <Fragment>
            <Dialog open={open}>
                <DialogHeader>Delete User</DialogHeader>
                <DialogBody divider>
                    <div>
                        <h1 className="text-2xl">This action can't be undone!</h1>
                        <br />
                        <h4 className="text-xl">Do you want to delete this user</h4>
                        <h1 className="font-bold">Email: {dataUserDelete.email}</h1>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        onClick={handelClose}
                        className="mr-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" className="bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => handelDelete()}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );

}

export default ModalDeleteUser