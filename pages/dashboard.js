import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import {
  FormControlLabel,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Popover,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { CheckCircle, XCircle, Edit } from "lucide-react";
import Pagination from "../components/ui/pagination";
import { useTranslations } from "../utils/i18n";

const SampleTable = () => {
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;
  const rowsPerPage = 10;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const { locale } = useTranslations();
  const [selectedUser, setSelectedUser] = useState(null);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isPremium, setIsPremium] = useState(selectedUser?.role?.toLowerCase() === "premium");
  const [premiumDuration, setPremiumDuration] = useState("1"); // "1" for 1 Month, "4" for 4 Months



  // Debounce search input (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);


  // Reset page to 1 when search or filters change
useEffect(() => {
  router.push({
    pathname: router.pathname,
    query: { ...router.query, page: 1 },
  });
}, [debouncedSearch, roleFilter, statusFilter]);



  // Fetch data when currentPage, debouncedSearch, roleFilter, or statusFilter change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/admin/fetch-all-users?page=${currentPage}&limit=${rowsPerPage}&search=${debouncedSearch}&role=${roleFilter}&isVerified=${statusFilter}`
        );
       
        const result = await response.json();
        if (response.ok) {
          setData(result.users);
          setTotalPages(result.totalPages);
        } else {
          console.error("Error fetching users:");
        }
      } catch (error) {
        console.error("Network error while fetching users:");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, debouncedSearch, roleFilter, statusFilter]);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  // const [isPremium, setIsPremium] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenRoleModal = () => { 
    console.log("selectedUser from openRoleModal");
    setIsPremium(selectedUser?.role === "Premium"); // Set switch based on user role
    setOpenRoleModal(true);
    handleClose();
  };

  const handleCloseRoleModal = () => {
    setOpenRoleModal(false);
  };

  const handleRoleChange = () => {
    setIsPremium((prev) => !prev);
  };

  const handleSaveRole = async () => {
    try {
      const response = await fetch("/api/admin/change-role", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser?._id,
          newRole: isPremium ? "premium" : "basic",
          premiumDuration, // this will be undefined if switching to basic
          locale,
        }),
      });
  
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
  
      // Update your local state with the new role
      setData((prevData) =>
        prevData.map((user) => {
          if (user._id === selectedUser._id) {
            const now = new Date();
            const updatedPremiumExpiresAt = isPremium
              ? (premiumDuration === "1"
                  ? new Date(Date.UTC(
                      now.getUTCFullYear(),
                      now.getUTCMonth() + 1,
                      now.getUTCDate(),
                      now.getUTCHours(),
                      now.getUTCMinutes(),
                      now.getUTCSeconds()
                    ))
                  : new Date(Date.UTC(
                      now.getUTCFullYear(),
                      now.getUTCMonth() + 4,
                      now.getUTCDate(),
                      now.getUTCHours(),
                      now.getUTCMinutes(),
                      now.getUTCSeconds()
                    )))
              : null;
            return {
              ...user,
              role: isPremium ? "premium" : "basic",
              premiumExpiresAt: updatedPremiumExpiresAt,
            };
          }
          return user;
        })
      );
      
      // Close modal and show message
      setOpenRoleModal(false);
      setOpen(true);
      setMessage(result.message);
    } catch (error) {
      console.error("Error");
      alert(error.message);
      setMessage(error.message);
    }
  };

  

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch("/api/admin/delete-user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const result = await response.json();
      if (response.ok) {
        setData((prevData) => prevData.filter((user) => user._id !== userId));
        handleClose();
        // alert(result.message);
        setMessage(result.message);
        
      } else {
        // alert(result.message);
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage(result.message);
    } finally{
      setOpen(true);
    }

  };

  const translations = {
    searchUsers: locale === "es" ? "Buscar Usuarios" : "Search Users",
    role: locale === "es" ? "Rol" : "Role",
    allRoles: locale === "es" ? "Todos los Roles" : "All Roles",
    basic: locale === "es" ? "Básico" : "Basic",
    premium: locale === "es" ? "Premium" : "Premium",
    admin: locale === "es" ? "Administrador" : "Admin",
    status: locale === "es" ? "Estado" : "Status",
    all: locale === "es" ? "Todos" : "All",
    verified: locale === "es" ? "Verificado" : "Verified",
    notVerified: locale === "es" ? "No Verificado" : "Not Verified",
    name: locale === "es" ? "Nombre" : "Name",
    email: locale === "es" ? "Correo Electrónico" : "Email",
    edit: locale === "es" ? "Editar" : "Edit",
    noData: locale === "es" ? "No hay datos disponibles" : "No Data Available",
    editUserRole: locale === "es" ? "Editar Rol de Usuario" : "Edit User Role",
    deleteUser: locale === "es" ? "Eliminar Usuario" : "Delete User",
    cancel: locale === "es" ? "Cancelar" : "Cancel",
    save: locale === "es" ? "Guardar" : "Save",
    premiumLabel: locale === "es" ? "Premium" : "Premium",
    basicLabel: locale === "es" ? "Básico" : "Basic",
    expiresAt: locale === "es" ? "Expira el" : "Expires At",
  };
  
  

  return (
    <div className="flex flex-col gap-4 items-center min-h-screen p-3 bg-gray-100 dark:bg-gray-800 sm:p-8">
      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-2 w-full max-w-3xl mb-4">
       
      <TextField
  label={translations.searchUsers}
  variant="outlined"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  fullWidth
  sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "transparent",
      color: "#6B7280", // Neutral gray that works in both themes
      borderColor: "#6B7280",
      "&:hover fieldset": {
        borderColor: "#6B7280",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6B7280",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#6B7280", // Consistent label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#6B7280",
    },
    "& .MuiOutlinedInput-input": {
      color: "#6B7280", // Ensures text is always visible
    },
  }}

/>
        <div className="flex gap-2 sm:justify-start justify-center  ">
        <FormControl
  variant="outlined"
  fullWidth
  sx={{
    minWidth: 120,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "transparent",
      color: "#6B7280", // Matches the text field color
      borderColor: "#6B7280",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#6B7280",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#6B7280",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#6B7280", // Matches the label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#6B7280",
    },
    "& .MuiSelect-icon": {
      color: "#6B7280", // Dropdown arrow color
    },
    "& .MuiMenu-paper": {
      backgroundColor: "#fff", // Ensures dropdown background remains consistent
    },
    "& .MuiMenuItem-root": {
      color: "#6B7280",
    },
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "#f0f0f0",
    },
  }}
>
  <InputLabel id="role-filter-label">{translations.role}</InputLabel>
  <Select
    labelId="role-filter-label"
    value={roleFilter}
    onChange={(e) => setRoleFilter(e.target.value)}
    label="Role"
  >
    <MenuItem value="">{translations.allRoles}</MenuItem>
    <MenuItem value="basic">{translations.basic}</MenuItem>
    <MenuItem value="premium">{translations.premium}</MenuItem>
    <MenuItem value="admin">{translations.admin}</MenuItem>
  </Select>
</FormControl>



<FormControl
  variant="outlined"
  sx={{
    minWidth: 140,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "transparent",
      color: "#6B7280", // Matches text field color
      borderColor: "#6B7280",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#6B7280",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#6B7280",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#6B7280", // Matches the label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#6B7280",
    },
    "& .MuiSelect-icon": {
      color: "#6B7280", // Dropdown arrow color
    },
    "& .MuiMenu-paper": {
      backgroundColor: "#fff", // Dropdown background
    },
    "& .MuiMenuItem-root": {
      color: "#6B7280",
    },
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "#f0f0f0",
    },
  }}
>
  <InputLabel id="status-filter-label">{translations.status}</InputLabel>
  <Select
    labelId="status-filter-label"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    label="Status"
  >
    <MenuItem value="">{translations.all}</MenuItem>
    <MenuItem value="true">{translations.verified}</MenuItem>
    <MenuItem value="false">{translations.notVerified}</MenuItem>
  </Select>
</FormControl>

        </div>
      </div>

      <TableContainer component={Paper} 
       sx={{
        backgroundColor: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
        color: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Shadow effect   
      }}
      >
        <Table>
          <TableHead>
            <TableRow>
            <TableCell className="text-black dark:text-white">
            {translations.name}
</TableCell>

              <TableCell 
               className="text-black dark:text-white"
              >{translations.email}</TableCell>
              <TableCell className="text-black dark:text-white">{translations.role}</TableCell>
              <TableCell className="text-black dark:text-white">{translations.expiresAt}</TableCell>
              <TableCell className="text-black dark:text-white">{translations.status}</TableCell>
              <TableCell className="text-black dark:text-white">{translations.edit}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <TableRow key={index}  >
                  <TableCell>
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={150} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="circular" width={24} height={24} />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      variant="square"
                      sx={{ borderRadius: "6px" }}
                      width={24}
                      height={24}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : data?.length > 0 ? (
              data.map((row) => (
                <TableRow key={row._id} >
                 <TableCell  className="text-black dark:text-white"  >
                {row.name}
              </TableCell>

                  <TableCell className="text-black dark:text-white" >
                  {row.email}</TableCell>
                  <TableCell className="text-black dark:text-white"
              > {(row.role?.toUpperCase() || "N/A")}</TableCell>
                 
                     <TableCell className="text-black dark:text-white" >
                  {(row.role == "admin" || row.role == "basic" || !(row.premiumExpiresAt)) ? (locale === "es" ? "No aplica" : "N/A")  : 
                new Date(row.premiumExpiresAt).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })
                
                }
                  </TableCell>
                  
                  <TableCell className="text-black dark:text-white" >
                    {row.isVerified ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )}
                  </TableCell>

                  <TableCell>
                  <IconButton
                    onClick={(event) => row.role !== "admin" && handleOpen(event, row)}
                    disabled={row.role === "admin"} // Prevents interaction
                    className={row.role === "admin" ? "cursor-not-allowed opacity-50" : ""}
                  >
                    <Edit className="text-blue-500 hover:text-blue-600" size={20} />
                  </IconButton>
                </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}  className="text-black dark:text-white text-center" >
                {translations.noData}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Popover Menu */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleOpenRoleModal}>{translations.editUserRole}</MenuItem>
        <MenuItem
          onClick={() => handleDeleteUser(selectedUser?._id)}
          className="text-red-500"
        >
          {translations.deleteUser}
        </MenuItem>
      </Popover>

<Dialog open={openRoleModal} onClose={handleCloseRoleModal}>
  <DialogTitle>
    {locale === "es" ? "Editar Rol de Usuario" : "Edit User Role"}
  </DialogTitle>
  <DialogContent sx={{ width: "250px", paddingX: 3 }}>
    <FormControlLabel
      control={<Switch checked={isPremium} onChange={handleRoleChange} />}
      label={
        isPremium
          ? locale === "es" ? "Premium" : "Premium"
          : locale === "es" ? "Básico" : "Basic"
      }
    />
    {isPremium && (
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="premium-duration-label">
          {locale === "es" ? "Duración de Premium" : "Premium Duration"}
        </InputLabel>
        <Select
          labelId="premium-duration-label"
          value={premiumDuration}
          label={locale === "es" ? "Duración de Premium" : "Premium Duration"}
          onChange={(e) => setPremiumDuration(e.target.value)}
        >
          <MenuItem value="1">
            {locale === "es" ? "1 Mes" : "1 Month"}
          </MenuItem>
          <MenuItem value="4">
            {locale === "es" ? "4 Meses" : "4 Months"}
          </MenuItem>
        </Select>
      </FormControl>
    )}
  </DialogContent>
  <DialogActions sx={{ paddingX: 3 }}>
    <Button onClick={handleCloseRoleModal} color="secondary">
      {locale === "es" ? "Cancelar" : "Cancel"}
    </Button>
    <Button onClick={handleSaveRole} color="primary" variant="contained">
      {locale === "es" ? "Guardar" : "Save"}
    </Button>
  </DialogActions>
</Dialog>

    
        {/* MUI Dialog for Success Message */}
        <Dialog open={open} onClose={() => setOpen(false)}>
        {/* <DialogTitle>Operation Performed</DialogTitle> */}
        <DialogContent>{message && message}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>


      <Pagination totalPages={totalPages} />
    </div>
    








  );
};

export default SampleTable;
