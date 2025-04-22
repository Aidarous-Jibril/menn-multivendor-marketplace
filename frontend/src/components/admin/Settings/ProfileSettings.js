// components/admin/AdminProfileSettings.js
import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProfile, updateAdminProfile } from "@/redux/slices/adminSlice";
import { toast } from "react-toastify";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { adminInfo, isLoading, error, successMessage } = useSelector((state) => state.admin);

  // Local state to hold the admin profile data
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    avatar: "", // we'll store a Base64 URL here for updating
    password: "",
  });

  // Separate state for showing avatar preview
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Fetch admin profile when the component mounts
  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, [dispatch]);

  // When adminInfo is available, prefill the form fields
  useEffect(() => {
    if (adminInfo) {
      setProfile({
        name: adminInfo.name || "",
        email: adminInfo.email || "",
        phoneNumber: adminInfo.phoneNumber || "",
        avatar: adminInfo.avatar?.url || "",
        password: "", // keep password field empty to indicate "no change"
      });
      setAvatarPreview(adminInfo.avatar?.url || null);
    }
  }, [adminInfo]);

  // Show success or error messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
    if (error) {
      toast.error(error);
    }
  }, [successMessage, error]);

  // Handle change for text fields
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle file input for avatar upload and set preview
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a FileReader to convert the image file to a Base64 URL
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setProfile({ ...profile, avatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // When the admin clicks "Update Profile"
  const handleUpdate = () => {
    // Prepare data for updating.
    // If the password field is empty, we remove it so the backend doesn't update it.
    const updatedProfile = { ...profile };
    if (!updatedProfile.password) {
      delete updatedProfile.password;
    }
    dispatch(updateAdminProfile(updatedProfile));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 600,   }}>
      <Typography variant="h5" gutterBottom>
        Profile Settings
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={profile.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={profile.phoneNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        value={profile.password}
        onChange={handleChange}
        type="password"
        fullWidth
        margin="normal"
        helperText="Leave blank to keep your current password"
      />
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Avatar
        </Typography>
        {avatarPreview ? (
          <Box
            component="img"
            src={avatarPreview}
            alt="Avatar Preview"
            sx={{ width: 80, height: 80, borderRadius: "50%", mb: 1 }}
          />
        ) : (
          <Typography variant="body2">No avatar uploaded</Typography>
        )}
        <Button variant="contained" component="label">
          Upload Avatar
          <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
        </Button>
      </Box>
      <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 3 }}>
        Update Profile
      </Button>
    </Box>
  );
};

export default ProfileSettings;
