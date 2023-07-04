import { Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Alert } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { Typography } from '@material-ui/core';

const PrivateRoutes = (props) => {

    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return (
            <Alert className='mt-40'
                variant="gradient"
                color="red"
                icon={
                    <InformationCircleIcon
                        strokeWidth={2}
                        className="h-6 w-6"
                    />
                }
            >
                <Typography className="font-medium">Warning:</Typography>
                <ul class="mt-2 ml-2 list-disc list-inside">
                    <li>You don't have permission to access this route</li>
                    <li>You must login to view this route</li>
                </ul>
            </Alert>
        )
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoutes