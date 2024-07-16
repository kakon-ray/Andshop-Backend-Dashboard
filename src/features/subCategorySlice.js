import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3VzZXJfbG9naW4iLCJpYXQiOjE3MjExMDI2MjgsImV4cCI6MTcyMTEwNjIyOCwibmJmIjoxNzIxMTAyNjI4LCJqdGkiOiJhMklhNlVhV3FMeVhISTJJIiwic3ViIjoiMSIsInBydiI6ImE0YzQ4OGE5MDcwZDMwNTFlYzgyZWFiYzliYTZjZGYyMWVkNjU1M2MiLCJyb2xlIjoidXNlcmJhc2ljIn0.1BuwpxOJkv5Zm11BFFExNeo_eLxUX_f3DQVhB93NE8g'

export const createSubCategory = createAsyncThunk("createSubCategory", async (data, { rejectWithValue }) => {

    const response = await fetch(
        "http://127.0.0.1:8000/api/subcategory/add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer' + ' ' + token,
            },
            body: JSON.stringify(data),
        }
    );

    try {
        const result = await response.json();
        console.log(result)
        return result.subcategory;

    } catch (error) {
        return rejectWithValue(error)
    }


}
);

export const showSubCategory = createAsyncThunk('showSubCategory', async (args, { rejectWithValue }) => {
    const response = await fetch("http://127.0.0.1:8000/api/subcategory/show", {
        headers: {
            Authorization: 'Bearer' + ' ' + token,
        },
    });
    try {
        const result = await response.json()
        return result.subcategory;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateSubCategory = createAsyncThunk("updateSubCategory", async (data, { rejectWithValue }) => {
   
    const response = await fetch(
        `http://127.0.0.1:8000/api/subcategory/edit`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer' + ' ' + token,
            },
            body: JSON.stringify(data),
        }
    );

    try {
        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error)
    }


}
);

export const deleteSubCategory = createAsyncThunk("deleteSubCategory", async (id, { rejectWithValue }) => {
    console.log(id)
    const response = await fetch(
        `http://127.0.0.1:8000/api/subcategory/delete/${id}`, {
        method: "GET",
        headers: {
            Authorization: 'Bearer' + ' ' + token,
        },
    });

    try {
        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error)
    }


}
);




const subCategoryDetails = createSlice({
    name: "subCategoryDetails",
    initialState: {
        subcategories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // create category
            .addCase(createSubCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSubCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.subcategories.push(action.payload);
                toast.success('Subcategory created successfully!');
            })
            .addCase(createSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error('Failed to create Subcategory!');
            })

            //   show category
            .addCase(showSubCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(showSubCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.subcategories = action.payload;
            })
            .addCase(showSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //   update Subcategory
            .addCase(updateSubCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSubCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.subcategories = state.subcategories.map((item) =>
                    item.id === action.payload.id ? action.payload.data : item
                );
                toast.success(action.payload.msg);
            })
            .addCase(updateSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error('Failed to update Subcategory!');
            })

            //   delete Subcategory
            .addCase(deleteSubCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSubCategory.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.id) {
                    state.subcategories = state.subcategories.filter((item) => item.id != action.payload.id);
                  }
                  toast.success(action.payload.msg);

              
            })
            .addCase(deleteSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error('Failed to delete Subcategory!');
            });


    },



})

export default subCategoryDetails.reducer;