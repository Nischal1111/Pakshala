import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, CardContent, CardMedia, Typography } from '@mui/material';
import { ImSpinner2 } from "react-icons/im";
import { fadeIn } from "../motion/motion";
import { failednotify } from './Notify';
import { ToastContainer } from 'react-toastify';
import ConfirmationModal from "../components/ConfirmationModal"

const TableFilter = () => {
    const [loading, setLoading] = useState(false);
    const [tableList, setTableList] = useState([]);
    const [filteredTables, setFilteredTables] = useState([]);
    const [btnClicked, setClicked] = useState("all tables");
    const [open, setOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        date: '',
        time: '',
        guests: '',
    });

    const handleClickOpen = (table) => {
        setSelectedTable(table);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedTable(null);
        setFormData({
            name: '',
            email: '',
            contact: '',
            date: '',
            time: '',
            guests: '',
        });
    };

    const [modalOpen,setModalOpen]=useState(false)
  const handleModalClose=()=>setModalOpen(false)

    const getAllTable = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/get-table-items`);
            const data = await response.json();
            if (data.success) {
                setTableList(data.tableItems);
                setFilteredTables(data.tableItems);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllTable();
    }, []);

    const handleFilter = (e) => {
        const choice = e.target.value.toLowerCase();
        setClicked(choice);

        if (choice === "all tables") {
            setFilteredTables(tableList);
        } else {
            setFilteredTables(tableList.filter(table => table.table_category.toLowerCase() === choice));
        }
    };

    const handleReserve = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/request-table-reserve/${selectedTable._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (data.success) {
                setModalOpen(true)
                handleClose();
            } else {
                failednotify();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const getCurrentTime = () => {
        const today = new Date();
        return today.toTimeString().split(' ')[0].slice(0, 5);
    };

    return (
        <div className='room-filter'>
            <ToastContainer />
            <h1>Reserve a table</h1>
            <div className="filter-choice">
                {["all tables", "terrace", "bar", "lobby", "indoor", "dining", "rooftop"].map((category) => (
                    <button
                        key={category}
                        value={category}
                        onClick={handleFilter}
                        className={btnClicked === category ? "clicked" : ""}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>
            <div className="room-cards">
                {loading ? (
                    <div className='loading-spinner'>
                        <ImSpinner2 className='loading' />
                    </div>
                ) : filteredTables.length === 0 ? (
                    <div className='no-special-div'>
                        <h1>No tables available</h1>
                    </div>
                ) : (
                    filteredTables.map((table, index) => (
                        <motion.div
                            key={table._id}
                            className='singleroom-card'
                            style={{ backgroundColor: "#F3EEEA", position: "relative" }}
                            variants={fadeIn("up", "spring", index * 0.01, 0.1)}
                            viewport={{ once: "true" }}
                            initial="hidden"
                            whileInView="show"
                        >
                            <CardMedia
                                component="img"
                                alt={table.table_name}
                                image={table.table_image.url}
                                className='roomcard-img'
                            />
                            <CardContent>
                                <div className="nameandrating" style={{ display: "flex", alignItems: "center" }}>
                                    <Typography gutterBottom component="div" style={{ fontFamily: "Lato", fontSize: "1.1rem", letterSpacing: "2px" }}>
                                        {table.table_name}
                                    </Typography>
                                </div>
                                <Typography variant="body2" style={{ fontFamily: "Lato", fontSize: "1rem", letterSpacing: "1.4px", color: "black", lineHeight: "2rem" }}>
                                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: ".8rem" }}>
                                        <FaUser />
                                        <span>Up to {table.table_guests} guest/s</span>
                                    </div>
                                </Typography>
                            </CardContent>
                            <div className="overlay2" onClick={() => handleClickOpen(table)}>
                                <button
                                    style={{
                                        backgroundColor: table.tableStatus === "Booked" ? "gray" :
                                            table.tableStatus === "Pending" ? "#FFC107" : "var(--primary-color)",
                                    }}
                                    disabled={table.tableStatus !== "Available"}
                                >
                                    {table.tableStatus === "Booked" ? "Reserved" : 
                                        table.tableStatus === "Pending" ? "In Queue" : "Reserve"}
                                </button>
                            </div>
                            <div style={{ position: "absolute", top: ".7rem", left: "1.2rem", display: "flex", gap: ".5rem", alignItems: "center", backgroundColor: "white", padding: ".3rem .8rem", borderRadius: ".3rem" }}>
                                <div style={{ height: ".7rem", width: ".7rem", borderRadius: "50%", backgroundColor: table.tableStatus === "Booked" ? "#8686f0" : table.tableStatus === "Pending" ? "#FFC107" : "lightgreen" }}></div>
                                <p style={{ fontSize: ".8rem" }}>{table.tableStatus}</p>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Reserve {selectedTable?.table_name}</DialogTitle>
    <DialogContent>
        <DialogContentText>
            Please fill in the form to reserve your table.
        </DialogContentText>
        <form>
            {Object.keys(formData).map((key) => (
                <TextField
                    key={key}
                    margin="dense"
                    id={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    type={key === "guests" ? "number" : key === "date" ? "date" : key === "time" ? "time" : key === "email" ? "email" : "text"}
                    fullWidth
                    autoComplete='off'
                    InputLabelProps={{ shrink: true }}
                    inputProps={
                        key === "contact" 
                        ? { inputMode: 'numeric', pattern: '[0-9]*' }
                        : key === "email"
                        ? { pattern: '^[a-zA-Z0-9._%+-]+@gmail\.com$' }
                        : key === "date" 
                        ? { min: getCurrentDate() } 
                        : key === "time" 
                        ? { min: formData.date === getCurrentDate() ? getCurrentTime() : undefined } 
                        : {}
                    }
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
            ))}
        </form>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose} style={{color:"var(--hover-color)"}}>Cancel</Button>
        <Button onClick={handleReserve}>Reserve</Button>
    </DialogActions>
</Dialog>

            <ConfirmationModal open={modalOpen} handleClose={handleModalClose} message={"reserved a table"}/>
        </div>
    );
};

export default TableFilter;
