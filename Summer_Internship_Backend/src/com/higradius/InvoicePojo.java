package com.higradius;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Date;

// creating pojo class for invoice 
public class InvoicePojo {
	private String b_code;
	private String cust_no;
	private String name_cust;
	private Timestamp clear_date;
	private Integer busi_year;
	private Long doc_id;
	private Date post_date;
	private Date doc_date;
	
	private Date due_date;
	private String currency;
	private String doc_type;
	private Byte post_id; 
	private String area_buis;
	private Double amount;
	private Date baseline_date;
	private String cust_terms;
	private Long invoice_id;
	private Byte isOpen;
	private String notes;

	public String getB_code() {
		return b_code;
	}

	public void setB_code(String b_code) {
		if(b_code.isEmpty()) {
			this.b_code=null;
		}
		else {
			this.b_code = b_code;
		}
	}

	public String getCust_no() {
		return cust_no;
	}

	public void setCust_no(String cust_no) {
		if(cust_no.isEmpty()) {
			this.cust_no = null;
		}
		else {
			this.cust_no=cust_no;
		}
	}

	public String getName_cust() {
		return name_cust;
	}

	public void setName_cust(String name_cust) {
		if(name_cust.isEmpty()) {
			this.name_cust = null;
		}
		else {
			this.name_cust=name_cust;
		}
	}

	public Timestamp getClear_date() {
		return clear_date;
	}

	public void setClear_date(String clear_date) {
		try {
			if(clear_date==null||clear_date=="") {
				this.clear_date=null;
			}
			else {
				java.util.Date javaDatetime = new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(clear_date);
				Timestamp jdbcDatetime = new Timestamp(javaDatetime.getTime());
				this.clear_date = jdbcDatetime;
			}			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	

	public Integer getBusi_year() {
		return busi_year;
	}

	public void setBusi_year(String busi_year) {
		if(busi_year.isEmpty()) {
			this.busi_year=null;
		}
		else {
			Integer y=(int)Double.parseDouble(busi_year);
			this.busi_year = y;
		}
	}

	public Long getDoc_id() {
		return doc_id;
	}

	public void setDoc_id(String doc_id) {
		if(doc_id.isEmpty()) {
			this.doc_id = null;
		}
		else {
		Long l=	Long.parseLong(String.valueOf((long)Math.round(Double.valueOf(doc_id))));
			this.doc_id = l;
		}
	}
	public Date getPost_date() {
		return post_date;
	}

	public void setPost_date(String post_date) {
		try{
			if(post_date.isEmpty()||post_date=="")
			{
				this.post_date=null;
			}
			else
			{
				java.util.Date javaDatetime = new SimpleDateFormat("yyyy-MM-dd").parse(post_date);
				Date jdbcDatetime = new Date(javaDatetime.getTime());
				this.post_date = jdbcDatetime;
			}
		}catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public Date getDoc_date() {
		return doc_date;
	}

	public void setDoc_date(String doc_date) {
		try {
		if(doc_date.isEmpty()||doc_date=="")
		{
			this.doc_date=null;
		}
		else {

			java.util.Date javaDatetime = new SimpleDateFormat("yyyyMMdd").parse(doc_date);
			Date jdbcDatetime = new Date(javaDatetime.getTime());
			this.doc_date = jdbcDatetime ;
		}
	}catch (Exception ex) {

		ex.printStackTrace();
	}
}


public Date getDue_date() {
	return due_date;
}

public void setDue_date(String due_date) {
	try {
		
	if(due_date.isEmpty()|| due_date=="")
	{
		this.due_date=null;
	}
	else {
			java.util.Date javaDatetime = new SimpleDateFormat("yyyy-MM-dd").parse(due_date);
			Date jdbcDatetime = new Date(javaDatetime.getTime());
			this.due_date = jdbcDatetime;
		}}
	catch (Exception ex) {
			ex.printStackTrace();
		}
	}

public String getCurrency() {
	return currency;
}

public void setCurrency(String currency) {
	if(currency.isEmpty()) {
		this.currency=null;
	}
	else {
		this.currency = currency;
	}
}

public String getDoc_type() {
	return doc_type;
}

public void setDoc_type(String doc_type) {
	if(doc_type.isEmpty()) {
		this.doc_type=null;
	}
	else {
		this.doc_type = doc_type;
	}
}

public Byte getPost_id() {
	return post_id;
}

public void setPost_id(String post_id) {
	if(post_id.isEmpty()) {
		this.post_id= null;
	}
	else {
		Byte b = (byte)Double.parseDouble(post_id);
		this.post_id = b;
	} 
}

public String getArea_buis() {
	return area_buis;
}

public void setArea_buis(String area_buis) {
	if(area_buis == null)
	{
		this.area_buis="";
	}
	else {

		this.area_buis = area_buis;
	}
}
public Double getAmount() {
	return amount;
}

public void setAmount(String amount) {
	if(amount.isEmpty())
	{
		this.amount=null;
	}
	else {
		Double d = Double.parseDouble(amount);
		this.amount = d;
	}
}
public Date getBaseline_date() {
	return baseline_date;
}

public void setBaseline_date(String baseline_date) {
	try {
		
	if(baseline_date.isEmpty()||baseline_date=="")
	{
		this.baseline_date= null;
	}
	else {

			java.util.Date javaDatetime = new SimpleDateFormat("yyyyMMdd").parse(baseline_date);
			Date jdbcDatetime = new Date(javaDatetime.getTime());
			this.baseline_date = jdbcDatetime;
		} 
	}
	catch (Exception ex) {
			ex.printStackTrace();
		}
	}


public String getCust_terms() {
	return cust_terms;
}

public void setCust_terms(String cust_terms) {
	if(cust_terms.isEmpty())
	{
		this.cust_terms=null;
	}
	else {


		this.cust_terms = cust_terms;
	}
}
public Long getInvoice_id() {
	return invoice_id;
}

public void setInvoice_id(String invoice_id) {
	if(invoice_id.isEmpty()) {
		this.invoice_id = null;
	}
	else {
		Long l=(long)Double.parseDouble(invoice_id);
		this.invoice_id = l;
	}
}
public Byte getIsOpen() {
	return isOpen;
}

public void setIsOpen(String isOpen) {
	if(isOpen.isEmpty()) {
		this.isOpen=(Byte) null;
	}
	else {
		Byte b = Byte.valueOf(isOpen);
		this.isOpen = b;
	}
}
public void setNotes(String notes) {
	if(name_cust.isEmpty()) {
		this.notes = null;
	}
	else {
		this.notes=notes;
	}
}
public String getNotes() {
	return notes;
}
}