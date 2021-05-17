package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;


@WebServlet("/searchinvoice")
public class SearchInvoiceServlet extends HttpServlet{
	
	//credentials
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/h2h_internship";
    static final String USER = "root";
    static final String PASS = "Rising@tiger123";
    Connection connection = null;
	
	 
		private static final long serialVersionUID = 1L;

		public SearchInvoiceServlet() {
			super();
		}

		@Override
		protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
			// TODO Auto-generated method stub
			
			PrintWriter out = resp.getWriter();
			resp.setContentType("application/json");
			resp.setCharacterEncoding("UTF-8");
			
			
			try {
				
			        Class.forName("com.mysql.cj.jdbc.Driver");
				    connection = DriverManager.getConnection(DB_URL,USER,PASS);
				    
				    //getting params for search
				    String id = req.getParameter("invoice_id");
				    int page = Integer.parseInt(req.getParameter("page"));
				   
				    
				    int limit = 10;
			        
				    //logic for pagination using limit and offset values
			        if (page == 0) {

			        }
			        else {
			        	page = page*limit+1;
			        }
			        
			        ResultSet rs;
			        
			        //2 different queries to be executed on basis of 2 different searches. 
			        //If search null then return all data pagewise
			        //If search not null then return searched data pagewise
			        
			        // if search value empty then return whole data as per page 
				    if(id == null || id=="" || id.length() == 0) {
						PreparedStatement stmt = connection.prepareStatement("SELECT * FROM invoice_details LIMIT ?,?");
						stmt.setInt(1,page);
						stmt.setInt(2, limit);
						
				        rs = stmt.executeQuery();
				    }
				    // if search query exists then return the searched part with pagination if more than 1 invoice details received
				    
				    else {
			        PreparedStatement statement = connection.prepareStatement("SELECT * FROM invoice_details where invoice_id LIKE ? LIMIT ? , 10 ");
			        statement.setString(1, id+"%"); 
			        statement.setInt(2,page);
				    
			        rs = statement.executeQuery();
			        
				    }
				    
			        List<InvoicePojo> result = new ArrayList<>();
			        
			        while(rs.next()) {
			        	InvoicePojo invoice = new InvoicePojo();
			        	
			        	invoice.setB_code(rs.getString("business_code"));
			        	invoice.setCust_no(rs.getString("cust_number"));
			        	invoice.setName_cust(rs.getString("name_customer"));
			        	invoice.setClear_date(String.valueOf(rs.getDate("clear_date")));
			        	invoice.setBusi_year(String.valueOf(rs.getDouble("business_year")));
			        	invoice.setDoc_id(rs.getString("doc_id"));
			        	invoice.setPost_date(String.valueOf(rs.getDate("posting_date")));
			        	invoice.setDoc_date(String.valueOf(rs.getDate("document_create_date")));
			        	invoice.setDue_date(String.valueOf(rs.getDate("due_in_date")));	
			        	invoice.setCurrency(rs.getString("invoice_currency"));
			        	invoice.setDoc_type(rs.getString("document_type"));
			        	invoice.setPost_id(rs.getString("posting_id"));
			        	invoice.setArea_buis(rs.getString("area_business"));
			        	invoice.setAmount(rs.getString("total_open_amount"));
			        	invoice.setBaseline_date(String.valueOf(rs.getString("baseline_create_date")));
			        	invoice.setCust_terms(rs.getString("cust_payment_terms"));
			        	invoice.setInvoice_id(rs.getString("invoice_id"));
			        	invoice.setIsOpen(rs.getString("isOpen"));
			        	invoice.setNotes(rs.getString("notes"));
			        	
			        	result.add(invoice);
			        
			        }
			        
	                Gson gson = new Gson();
			 
			        String data = gson.toJson(result);
			        out.print(data);
			        out.flush();
			        resp.setStatus(200);
		
			        
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			
		}

		@Override
		protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
			// TODO Auto-generated method stub
			doGet(req, resp);
		}


}
