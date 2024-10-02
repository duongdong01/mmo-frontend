import * as React from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ProfileApi } from '../../api/profile/profile';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Bounce, toast } from 'react-toastify';

interface profile {
  id: string;
  email: string;
  full_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  username: string;
  phone_number: string;
  google_id: string;
  dob: string;
  gender: string;
  avatar: string;
  cover_image: string;
  created_at: string;
  updated_at: string;
}

const image = {
  url: 'https://mui.com/static/images/cards/live-from-space.jpg',
  title: 'Breakfast',
  width: '40%',
};

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
  borderRadius: 12,
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function InputFileUpload({ changeImage }: { changeImage: (e: any) => void }) {
  return (
    <Button component="label" role={undefined} tabIndex={-1} sx={{ color: 'white' }}>
      Upload file
      <VisuallyHiddenInput
        type="file"
        accept="image/jpeg image/png image/jpg"
        onChange={(e) => {
          if (!e.target.files) return;
          const file = e.target.files[0];
          const image = URL.createObjectURL(file);
          changeImage(image);
          console.log(file);
        }}
      />
    </Button>
  );
}

function ButtonBaseDemo({ changeImage, avatar }: { changeImage: (e: any) => void; avatar: string }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: 240, padding: 2, borderRadius: 8 }}>
      <ImageButton
        focusRipple
        style={{
          width: '100%',
        }}
      >
        <ImageSrc style={{ backgroundImage: `url(${avatar})`, borderRadius: 12 }} />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <Image>
          <Typography
            component="div"
            variant="subtitle1"
            color="inherit"
            sx={{
              position: 'relative',
            }}
          >
            <InputFileUpload changeImage={changeImage} />
            <ImageMarked className="MuiImageMarked-root" />
          </Typography>
        </Image>
      </ImageButton>
    </Box>
  );
}
export default function Profile() {
  const [isChange, setIsChange] = React.useState<boolean>(false);
  const [values, setValues] = React.useState<profile>({
    id: '',
    email: '',
    full_name: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    username: '',
    phone_number: '',
    google_id: '',
    dob: '',
    gender: '',
    avatar: '',
    cover_image: '',
    created_at: '',
    updated_at: '',
  });

  const fectchApi = async () => {
    try {
      const res = await ProfileApi.getProfileByToken();
      setValues(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fectchApi();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setValues({ ...values, gender: event.target.value });
  };

  const changeImage = (e: any) => {
    setValues({ ...values, avatar: e });
  };

  const changeProfile = () => {
    setIsChange(!isChange);
  };

  const onSubmit = async () => {
    const data = await ProfileApi.updateProfileByToken({
      full_name: values.full_name,
      first_name: values.first_name,
      last_name: values.last_name,
      middle_name: values.middle_name,
      dob: values.dob,
      gender: values.gender,
      avatar: values.avatar,
      cover_image: values.cover_image,
      google_id: values.google_id,
      phone_number: values.phone_number,
    });
    if (data && data.statusCode === 400) {
      toast.error('Profile update failed!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    }
    if (data && data.statusCode === 200) {
      toast.success('Profile update successful', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    }
    setIsChange(!isChange);
  };
  return (
    <Card sx={{ minWidth: 400, display: 'flex', flexDirection: 'row', position: 'relative' }}>
      {isChange ? (
        <ButtonBaseDemo changeImage={changeImage} avatar={values.avatar} />
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: 240, padding: 2, borderRadius: 8 }}>
          <ImageButton
            focusRipple
            style={{
              width: '100%',
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${values.avatar})`, borderRadius: 12 }} />
          </ImageButton>
        </Box>
      )}
      <div className="flex flex-col p-4 w-1/3">
        <div className="font-semibold pt-2 pb-2 text-2xl">{`${values.first_name} ${values.last_name}`}</div>
        <div className="flex flex-row pb-2">
          <div className="min-w-24">Email</div>
          <div className="min-w-12">:</div>
          <TextField id="email" variant="standard" disabled={true} value={values.email} />
        </div>
        <div className="flex flex-row pb-2">
          <div className="min-w-24">Điện thoại</div>
          <div className="min-w-12">:</div>
          <TextField
            id="phone-number"
            variant="standard"
            disabled={!isChange}
            value={values.phone_number}
            onChange={(e) => {
              setValues({ ...values, phone_number: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-row pb-2">
          <div className="min-w-24">Giới tính</div>
          <div className="min-w-12">:</div>
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={values.gender}
              disabled={!isChange}
              defaultValue="Male"
              onChange={handleChange}
              label="gender"
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="flex flex-col p-4 w-1/3">
        <div className="flex flex-row pb-2 pt-12">
          <div className="min-w-24">Tên</div>
          <div className="min-w-12">:</div>
          <TextField
            id="first-name"
            variant="standard"
            disabled={!isChange}
            value={values.first_name}
            onChange={(e) => {
              setValues({ ...values, first_name: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-row pb-2">
          <div className="min-w-24">Họ</div>
          <div className="min-w-12">:</div>
          <TextField
            id="last-name"
            variant="standard"
            disabled={!isChange}
            value={`${values.last_name}`}
            onChange={(e) => {
              setValues({ ...values, first_name: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 flex flex-col items-end w-64">
        {!isChange ? (
          <Button onClick={changeProfile} sx={{ margin: 2 }} variant="outlined">
            Chỉnh sửa
          </Button>
        ) : (
          <Button onClick={onSubmit} sx={{ margin: 2 }} variant="contained">
            Lưu lại
          </Button>
        )}
      </div>
    </Card>
  );
}
