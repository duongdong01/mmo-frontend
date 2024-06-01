import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import HistoryIcon from "@mui/icons-material/History";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Cookies from "js-cookie";
import DialogAuth from "../auth/auth";
import { CategoryApi } from "../../api/category/category"

type Category = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  category_types: {
      id: string;
      name: string;
      category_id: string;
      created_at: string;
      updated_at: string;
      category: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
      }
  }[]
}

function TabLists() {
  const [value, setValue] = useState(-1);
  const [data, setData] = useState<Category[]>([]);

  const fectchApi = async () => {
    try {
      const res = await CategoryApi.getCategory();
      setData(res.data.results)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fectchApi()
  },[])
  return (
    <div className="flex flex-row w-1/2 justify-around h-full cursor-pointer">
      {data.map((item, index)=>{
          return (
            <div
              key={index}
              className="relative inline p-4 hover:border-b-4 border-sky-500"
              onMouseOver={() => {
                setValue(index);
              }}
              onMouseOut={() => {
                setValue(-1);
              }}
            >
              {item.name}
              {item.category_types.length !== 0 ? 
                <div
                  className={
                    value === index
                      ? "absolute top-[64px] left-0 "
                      : "absolute top-[64px] left-0  hidden"
                  }
                >
                  <List
                    className="bg-white"
                    sx={{ width: "200px", maxWidth: 360, bgcolor: "white" }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    {item.category_types.map((item, index)=>{
                      return (
                      <ListItem key={index} className="hover:bg-slate-200 bg-white">
                        <ListItemText primary={item.name}></ListItemText>
                      </ListItem>
                      )
                    })}
                  </List>
                </div> 
                :
                ''
              }
            </div>
          )
      })}
    </div>
  );
}

function BasicPopover() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Avatar>H</Avatar>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <NestedList handleClose={handleClose}></NestedList>
        </Typography>
      </Popover>
    </div>
  );
}

function NestedList({ handleClose }: { handleClose: Function }) {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton
        onClick={() => {
          handleClose();
        }}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Thông tin cá nhân" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          handleClose();
        }}
      >
        <ListItemIcon>
          <LocalGroceryStoreIcon />
        </ListItemIcon>
        <ListItemText primary="Đơn hàng đã mua" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          handleClose();
        }}
      >
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Lịch sử thanh toán" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          handleClose();
        }}
      >
        <ListItemIcon>
          <ContentPasteIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý nội dung" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          handleClose();
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Đăng xuất" />
      </ListItemButton>
    </List>
  );
}

export default function PageHeader() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    console.log("access_token", Cookies.get("access_token"));
    if (Cookies.get("access_token")) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="flex flex-row w-full justify-between items-center h-16">
      <div className="logo bg-black w-32 h-14"></div>
      <TabLists></TabLists>
      {isLogin ? (
        <div className="flex flex-row justify-between w-60">
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
          <IconButton>
            <MailOutlineIcon />
          </IconButton>
          <IconButton>
            <QuestionAnswerIcon />
          </IconButton>
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
          <BasicPopover></BasicPopover>
        </div>
      ) : (
        <DialogAuth setIsLogin={setIsLogin} />
      )}
    </div>
  );
}
