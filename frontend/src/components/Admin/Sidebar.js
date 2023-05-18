import { Link } from '@mui/material'
import React from 'react'
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const Sidebar = () => {
    return (
        <div className="mt-50">
            <Link to="/">
                <h1>Ecommerce</h1>
            </Link>
            <Link to="/admin/dashboard">
                <h1>Dashboard</h1>
            </Link>
            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    <TreeItem nodeId="1" label="Product">
                        <TreeItem nodeId="2" label="Add Product" />
                        <TreeItem nodeId="3" label="Edit Product" />
                        <TreeItem nodeId="4" label="Delete Product" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="User">
                        <TreeItem nodeId="6" label="Add User" />
                        <TreeItem nodeId="7" label="Edit User" />
                        <TreeItem nodeId="8" label="Delete User" />
                    </TreeItem>
                    <TreeItem nodeId="9" label="Order">
                        <TreeItem nodeId="10" label="View Orders" />
                        <TreeItem nodeId="11" label="Manage Orders" />
                    </TreeItem>
                    <TreeItem nodeId="12" label="Review">
                        <TreeItem nodeId="13" label="View Reviews" />
                        <TreeItem nodeId="14" label="Manage Reviews" />
                    </TreeItem>
                </TreeView>
            </Link>
            <div>
                {/* <Line data={lineState} /> */}
            </div>
            <div>
                {/* <Doughnut data={doughnutState} /> */}
            </div>
        </div>

    )
}

export default Sidebar