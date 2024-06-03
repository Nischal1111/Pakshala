import React, { useState } from 'react';
import "../Css/Rooms.css";
import { FaUser } from "react-icons/fa";
import { fadeIn } from "../motion/motion";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import { SectionWrapper } from "../motion/index";
import { ImSpinner2 } from "react-icons/im";
import { allTables } from "../data";

const TableCard = ({ table, index }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <motion.div className='singleroom-card'
            style={{ backgroundColor: "#F3EEEA", position: "relative" }}
            variants={fadeIn("up", "spring", index * .01, .1)}
            viewport={{ once: "true" }}
            initial="hidden"
            whileInView="show">
            <CardMedia
                component="img"
                alt={table.name}
                image={table.img}
                className='roomcard-img'
            />
            <CardContent>
                <div className="nameandrating" style={{ display: "flex", alignItems: "center" }}>
                    <Typography gutterBottom component="div" style={{ fontFamily: "Lato", fontSize: "1.1rem", letterSpacing: "2px" }}>
                        {table.name}
                    </Typography>
                </div>
                <Typography variant="body2" style={{ fontFamily: "Lato", fontSize: "1rem", letterSpacing: "1.4px", color: "black", lineHeight: "2rem" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: ".8rem" }}>
                        <FaUser />
                        <span>Up to {table.guests} guest/s</span>
                    </div>
                </Typography>
            </CardContent>
            <div className="overlay2" onClick={handleClickOpen}>
                <h2>Reserve</h2>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reserve {table.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill in the form to reserve your table.
                    </DialogContentText>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            autoComplete='off'
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="standard"
                            autoComplete='off'
                        />
                        <TextField
                            margin="dense"
                            id="contact"
                            label="Contact Number"
                            type="tel"
                            fullWidth
                            variant="standard"
                            autoComplete='off'
                        />
                        <TextField
                            margin="dense"
                            id="date"
                            label="Date"
                            type="date"
                            fullWidth
                            autoComplete='off'
                            variant="standard"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="time"
                            label="Time"
                            type="time"
                            fullWidth
                            variant="standard"
                            autoComplete='off'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="guests"
                            label="Guests"
                            type="number"
                            fullWidth
                            autoComplete='off'
                            variant="standard"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Reserve</Button>
                </DialogActions>
            </Dialog>
        </motion.div>
    );
};

const TableFilter = () => {
    const [loading, setLoading] = useState(false);
    const [tableList, setTableList] = useState(allTables);
    const [btnClicked, setClicked] = useState("all tables");

    const handleFilter = (e) => {
        setLoading(true);

        setTimeout(() => {
            const choice = e.target.value.toLowerCase();
            setClicked(choice);
            if (choice === "all tables") {
                setTableList(allTables);
            } else {
                setTableList(allTables.filter(table => table.category === choice));
            }

            setLoading(false);
        }, 1000);
    };

    return (
        <div className='room-filter'>
            <h1>Reserve a table</h1>
            <div className="filter-choice">
                <button value="all tables" onClick={handleFilter} className={btnClicked === "all tables" ? "clicked" : ""}>
                    All tables
                </button>
                <button value="4guests" onClick={handleFilter} className={btnClicked === "4guests" ? "clicked" : ""}>
                    4 Guests
                </button>
                <button value="family" onClick={handleFilter} className={btnClicked === "family" ? "clicked" : ""}>
                    Family table
                </button>
                <button value="rooftop" onClick={handleFilter} className={btnClicked === "rooftop" ? "clicked" : ""}>
                    Rooftop table
                </button>
                <button value="dining" onClick={handleFilter} className={btnClicked === "dining" ? "clicked" : ""}>
                    Dining table
                </button>
                <button value="meeting" onClick={handleFilter} className={btnClicked === "meeting" ? "clicked" : ""}>
                    Meeting table
                </button>
            </div>
            <div className="room-cards">
                {loading ? (
                    <div className='loading-spinner'>
                        <ImSpinner2 className='loading' />
                    </div>
                ) : (
                    tableList.map((table, index) => (
                        <TableCard key={table.id} table={table} index={index} />
                    ))
                )}
            </div>
        </div>
    );
};

export default SectionWrapper(TableFilter, "");
