# Validation is not run on untouched fields that are requried

for example the hourly rate field is not required in job form but is required when 
preparing for invoice. formik does not run validation on a field if it was not 
provided with an intital value.  

I could provide an intital value object with hourly rate set to null.
this will pass validation on form because path not required.
it will load the path as null on prepareforinvoice validation and it will then fail 
that validation.