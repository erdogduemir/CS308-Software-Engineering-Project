import React, { useEffect, useState } from 'react';
import '../Components/AdminDesign.css';
import Sidebar from './Functions/Sidebar.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { COMMENTS_API_URL } from '../../constants';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdminCommentsPage() {

  const [open, setOpen] = useState(false)
  const [post, setPost] = useState([])
  const [comment, setComment] = useState({})

  function refreshPage() {
    window.location.reload(true);
  }

  const handleClickOpen = (row) => {
    setComment(row)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get(COMMENTS_API_URL).then((response) => {
        setPost(response.data)
    })
    console.log(comment)
  }, [])

  axios.defaults.headers.put['Authorization'] = `JWT ${localStorage.getItem('access')}`;

  function approveComment(row) {
    axios.put(COMMENTS_API_URL + row.pk + "/",
      {
        "cproduct": row.cproduct,
        "ccustomer": row.ccustomer,
        "ctext": row.ctext,
        "c_is_approved": true
      }
    )
    refreshPage()
  }

  function deleteComment() {
    axios.delete(COMMENTS_API_URL + comment.pk + "/")
    refreshPage()
  }

    return (
        <div className="dashboard main-content">
          <header className="page-header">
            <span className="page-title">Comments on Your Products</span>
          </header>
          <Sidebar />
          <div className='comments-container'>
            <Stack direction='column'>
              <h3 className='awaiting-approval'>Awaiting Approval</h3>
              <div className='table'>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{fontWeight: '600'}} align="center">Comment</TableCell>
                        <TableCell style={{fontWeight: '600'}} align="center">Car</TableCell>
                        <TableCell style={{fontWeight: '600'}} align="center">Date</TableCell>
                        <TableCell style={{fontWeight: '600'}} align="center">Approve</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {post.map((row) => (
                        !row.c_is_approved
                        ? <TableRow
                          key={row.ctext}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {row.ctext}
                          </TableCell>
                          <TableCell align="center">{row.cproduct}</TableCell>
                          <TableCell align="center">{row.ccreated_date.substring(0 ,10)}</TableCell>
                          <TableCell align="center">
                            <FontAwesomeIcon
                            icon={faCircleCheck}
                            className='checkmark'
                            onClick={() => { approveComment(row) }} />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon
                            icon={faCircleXmark}
                            className='x-mark'
                            onClick={() => { handleClickOpen(row) }} />
                          </TableCell>
                        </TableRow>
                        : null
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <h3 className='awaiting-approval'>Approved Comments</h3>
              <div className='table'>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{fontWeight: '600'}} align="center">Comment</TableCell>
                        <TableCell style={{fontWeight: '600'}} align="center">Car</TableCell>
                        <TableCell style={{fontWeight: '600'}} align="center">Date</TableCell>
                        <TableCell style={{fontWeight: '600'}} align="center">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {post.map((row) => (
                        row.c_is_approved
                        ? <TableRow
                          key={row.ctext}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {row.ctext}
                          </TableCell>
                          <TableCell align="center">{row.cproduct}</TableCell>
                          <TableCell align="center">{row.ccreated_date.substring(0, 10)}</TableCell>
                          <TableCell align="center">
                            <FontAwesomeIcon
                            icon={faTrashCan}
                            className='x-mark'
                            onClick={() => { handleClickOpen(row) }} />
                          </TableCell>
                        </TableRow>
                        : null
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Stack>
          </div>
          <Dialog
            className="dialog-popup"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
                <span className='dialog-text'>
                  Are you sure you want to delete the comment?
                </span>
              </DialogTitle>
            <DialogActions>
              <button className='dialog-button-no' onClick={handleClose}>NO</button>
              <button className='dialog-button-yes' onClick={() => { deleteComment() }}>YES</button>
            </DialogActions>
          </Dialog>
        </div>
      );
}