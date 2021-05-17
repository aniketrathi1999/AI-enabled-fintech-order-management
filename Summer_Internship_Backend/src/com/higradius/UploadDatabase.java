package com.higradius;

import java.io.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.higradius.InvoicePojo; 

public class UploadDatabase {
	public static void main(String[] args) {
		
		// database creds
        String jdbcURL = "jdbc:mysql://localhost:3306/h2h_internship";
        String username = "root";
        String password = "Rising@tiger123";
 
        String csvFilePath = "C:\\Users\\anike\\Documents\\Documents\\HRC\\Final_Submission\\1805464.csv";
 
        int batchSize = 1000; // defining batch size
        
        Connection connection = null;
        
        try {
 
            connection = DriverManager.getConnection(jdbcURL, username, password);
            connection.setAutoCommit(false);
            List<InvoicePojo>invoice = new ArrayList<>();
            String sql = "INSERT INTO invoice_details (business_code, cust_number,name_customer,clear_date,business_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,isOpen) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            PreparedStatement statement = connection.prepareStatement(sql);
 
            BufferedReader lineReader = new BufferedReader(new FileReader(csvFilePath));
            String lineText = null;
 
            int count = 0;
 
            lineReader.readLine(); // skip header line
 
            while ((lineText = lineReader.readLine()) != null) {
                String[] arr = lineText.split(",");
                if(arr.length>0) {
					//reading values from CSV
						InvoicePojo pj = new InvoicePojo();
						pj.setB_code(arr[0]);
						pj.setCust_no(arr[1]);
						pj.setName_cust(arr[2]);
						pj.setClear_date(arr[3]);
						pj.setBusi_year(arr[4]);
						pj.setDoc_id(arr[5]);
						pj.setPost_date(arr[6]);
						pj.setDoc_date(arr[7]);
						pj.setDue_date(arr[9]);
						
						pj.setCurrency(arr[10]);
						pj.setDoc_type(arr[11]);
						pj.setPost_id(arr[12]);
						pj.setArea_buis(arr[13]);
						pj.setAmount(arr[14]);
						pj.setBaseline_date(arr[15]);
						pj.setCust_terms(arr[16]);
						pj.setInvoice_id(arr[17]);
						pj.setIsOpen(arr[18]);
						
						invoice.add(pj);
                }
            }
 
              
                
				for(InvoicePojo rs:invoice)
				{
				statement.setString(1,rs.getB_code());
				statement.setString(2,rs.getCust_no() );
				statement.setString(3, rs.getName_cust());
				statement.setTimestamp(4, rs.getClear_date());
				statement.setInt(5, rs.getBusi_year());
				//statement.setLong(6, rs.getDoc_id());
				if(rs.getDoc_id()==null)
					statement.setInt(6, Types.NULL);
				else
					statement.setLong(6, rs.getDoc_id());
				statement.setDate(7, rs.getPost_date());
				statement.setDate(8, rs.getDoc_date());
				statement.setDate(9, rs.getDue_date());
				statement.setString(10, rs.getCurrency());
				statement.setString(11, rs.getDoc_type());
				statement.setByte(12, rs.getPost_id());
				statement.setString(13, rs.getArea_buis());
				statement.setDouble(14, rs.getAmount());
				statement.setDate(15, rs.getBaseline_date());
				statement.setString(16, rs.getCust_terms());
				//statement.setLong(17, rs.getInvoice_id());
				if(rs.getInvoice_id()==null) {
					statement.setInt(17, Types.NULL);
				}else
					statement.setLong(17, rs.getInvoice_id());
				statement.setByte(18, rs.getIsOpen());
				
                statement.addBatch();
                count++;
 
                if (count % batchSize == 0) {
                    statement.executeBatch();
                }
            }
				System.out.println("Records Updated Successfully");
    			System.out.println("Line Count= "+count);
            lineReader.close();
 
            // execute the remaining queries
            //statement.executeBatch();
 
            connection.commit();
            connection.close();
 
                
            } 
        catch (IOException ex) {
            System.err.println(ex);
        } catch (SQLException ex) {
            ex.printStackTrace();
 
            //try {
             //   connection.rollback();
           // } catch (SQLException e) {
              //  e.printStackTrace();
           // }
	}
	
 
        	}
	
        
        
	}
