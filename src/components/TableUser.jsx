import React, { useEffect, useState } from "react"
import axios from 'axios';
import { fetchAllUser } from "../service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _, { debounce } from "lodash"
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const TableUser = (props) => {

    const [listUsers, setListUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isOpenAdd, setIsOpenAdd] = useState(false)

    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})

    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
    const [dataUserDelete, setDataUserDetele] = useState({})

    const [sortBy, setSortBy] = useState("asc")
    const [sortField, setSortField] = useState("id")

    const [keywords, setKeywords] = useState("")


    const handelClose = () => {
        setIsOpenAdd(false)
        setIsOpenEdit(false)
        setIsOpenModalDelete(false)
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user)
        setIsOpenEdit(true)
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers)
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUser[index].first_name = user.first_name
        setListUsers(cloneListUser)
    }

    const handelDeleteUser = (user) => {
        setIsOpenModalDelete(true)
        setDataUserDetele(user)
    }

    const handelDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers)
        cloneListUser = cloneListUser.filter(item => item.id !== user.id)
        setListUsers(cloneListUser)
    }

    useEffect(() => {
        getUser(1)
    }, [])

    const getUser = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setTotalUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUser(+event.selected + 1)
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy)
        setSortField(sortField)
        let cloneListUser = _.cloneDeep(listUsers)
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy])
        setListUsers(cloneListUser)
    }

    const handelSearch = debounce((event) => {
        let term = event.target.value
        console.log(term);
        if (term) {
            let cloneListUser = _.cloneDeep(listUsers)
            cloneListUser = cloneListUser.filter(item => item.email.includes(term))
            console.log(cloneListUser);
            setListUsers(cloneListUser)
        } else {
            getUser(1)
        }
    }, 300)

    return (
        <div>
            <div className='mt-20 flex justify-between mx-40'>
                <span>List User</span>
                <button className='bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded' onClick={() => { setIsOpenAdd(true) }}>Add new User</button>
            </div>
            <div className="justify-between ml-20 ">
                <input
                    className="border border-gray-900 p-2 rounded-lg "
                    placeholder="Search user by email"
                    style={{ width: '400px' }}
                    // value={keywords}
                    onChange={(event) => handelSearch(event)}
                />
            </div>
            <div className="flex flex-col container mx-10">
                <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-200 border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            <div className="sort-header">
                                                <span>ID</span>
                                                <span>
                                                    <FontAwesomeIcon
                                                        className="i-header"
                                                        onClick={() => handleSort("desc", "id")}
                                                        icon={faArrowDown} />
                                                    <FontAwesomeIcon
                                                        className="i-header"
                                                        onClick={() => handleSort("asc", "id")}
                                                        icon={faArrowUp} />
                                                </span>
                                            </div>
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Email
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            <div className="sort-header">
                                                <span>First Name</span>
                                                <span>
                                                    <FontAwesomeIcon
                                                        className="i-header"
                                                        onClick={() => handleSort("desc", "first_name")}
                                                        icon={faArrowDown} />
                                                    <FontAwesomeIcon
                                                        className="i-header"
                                                        onClick={() => handleSort("asc", "first_name")}
                                                        icon={faArrowUp} />
                                                </span>
                                            </div>
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Last Name
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUsers && listUsers.length > 0 &&
                                        listUsers.map((item, index) => {
                                            return (
                                                <tr key={`user - ${index}`} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.email}</td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.first_name}</td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.last_name}</td>
                                                    <td className="flex mt-2">
                                                        <button
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2"
                                                            onClick={() => handleEditUser(item)}
                                                        >Edit</button>
                                                        <button
                                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => handelDeleteUser(item)}
                                                        >Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <ReactPaginate className="flex items-center mt-6 border"
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item mr-6 item-centers border"
                                pageLinkClassName="page-link"
                                previousClassName="page-item mr-6 item-centers"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                            />

                        </div>
                    </div>
                </div>
            </div>
            <ModalAddUser
                open={isOpenAdd}
                handelClose={handelClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditUser
                open={isOpenEdit}
                dataUserEdit={dataUserEdit}
                handelClose={handelClose}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalDeleteUser
                open={isOpenModalDelete}
                handelClose={handelClose}
                dataUserDelete={dataUserDelete}
                handelDeleteUserFromModal={handelDeleteUserFromModal}
            />
        </div>
    )
}

export default TableUser