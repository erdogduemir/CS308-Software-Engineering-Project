import React, { useState, useEffect } from 'react';
import '../../Components/AdminDesign.css';
import SidebarButton from './SidebarButton';
import { useNavigate } from 'react-router-dom'
import { faChartSimple, faCarSide, faComment, faTruck, faReceipt, faArrowLeft, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { AUTH_USERS_ME } from '../../../constants';
import axios from 'axios';

function Sidebar() {

  const [userInfo, setUserInfo] = useState(
    {
      is_staff: false,
      is_superuser: false
    }
  )
  const [selectedButton, setSelectedButton] = useState('dashboard');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const navigate = useNavigate()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  }

  useEffect(() => {
    axios.get(AUTH_USERS_ME, config).then((response) => {
      setUserInfo(response.data)
      console.log("current user below:")
      console.log(response.data)
    })
  }, [])

  return (
    <div className="sidebar">
      <img src="../../../logo_clear_2.png" alt="Logo" class="sidebar-logo"></img>
      <ul className="sidebar-buttons">
        <li>
          <SidebarButton
            icon={faChartSimple}
            text="Dashboard"
            isSelected={selectedButton === 'dashboard'}
            onClick={() => { handleButtonClick('dashboard'); navigate('/admin/dashboard') }}
          />
        </li>
        <li>
          <SidebarButton
            icon={faCarSide}
            text="Products"
            isSelected={selectedButton === 'products'}
            onClick={() => { handleButtonClick('products'); navigate('/admin/products') }}
          />
        </li>
        {userInfo.is_superuser
          ? <li>
            <SidebarButton
              icon={faComment}
              text="Comments"
              isSelected={selectedButton === 'comments'}
              onClick={() => { handleButtonClick('comments'); navigate('/admin/comments') }}
            />
          </li>
          : null
        }
        {userInfo.is_superuser
          ? <li>
            <SidebarButton
              icon={faTruck}
              text="Deliveries"
              isSelected={selectedButton === 'deliveries'}
              onClick={() => { handleButtonClick('deliveries'); navigate('/admin/orders') }}
            />
          </li>
          : null
        }
        {userInfo.is_superuser
          ? null
          : <li>
            <SidebarButton
              icon={faRightLeft}
              text="Requests"
              isSelected={selectedButton === 'requests'}
              onClick={() => { handleButtonClick('requests'); navigate('/admin/requests') }}
            />
          </li>
        }
        <li>
          <SidebarButton
            icon={faReceipt}
            text="Invoices"
            isSelected={selectedButton === 'invoices'}
            onClick={() => { handleButtonClick('invoices'); navigate('/admin/invoices') }}
          />
        </li>
        <li style={{ position: "fixed", bottom: "0px" }}>
          <SidebarButton
            icon={faArrowLeft}
            text="Home page"
            isSelected={selectedButton === 'logout'}
            onClick={() => { navigate('/home') }}
          />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
