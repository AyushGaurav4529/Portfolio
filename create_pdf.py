import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

def build_pdf():
    pdf_filename = "Ayush_Gaurav_CV.pdf"
    
    margin = 36 # 0.5 inch margins
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin
    )
    
    styles = getSampleStyleSheet()
    
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#000000'),
        spaceAfter=4
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#000000'),
        spaceAfter=10
    )
    
    heading_style = ParagraphStyle(
        'HeadingStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#000000'),
        spaceBefore=8,
        spaceAfter=3
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#000000'),
        spaceAfter=4
    )
    
    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#000000'),
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=2.5
    )

    subbullet_style = ParagraphStyle(
        'SubBulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#000000'),
        leftIndent=30,
        firstLineIndent=-10,
        spaceAfter=2
    )

    story = []
    
    # Header
    story.append(Paragraph("Ayush Gaurav", name_style))
    contact_text = (
        '<b>Email:</b> <a href="mailto:ayushgaurav4529@gmail.com" color="#0000EE">ayushgaurav4529@gmail.com</a> , '
        '<b>Phone No:</b> +91 8295813878<br/>'
        '<b>LinkedIn:</b> <a href="https://www.linkedin.com/in/ayugaurav/" color="#0000EE">https://www.linkedin.com/in/ayugaurav/</a> '
        '<b>GitHub:</b> <a href="https://github.com/AyushGaurav4529" color="#0000EE">https://github.com/AyushGaurav4529</a>'
    )
    story.append(Paragraph(contact_text, contact_style))
    
    # SUMMARY
    story.append(Paragraph("SUMMARY", heading_style))
    summary_text = (
        "Computer Science Engineering undergrad with hands-on experience in <b>Software Development, AI, Full Stack Web "
        "Development, Python &amp; C Programming</b>. Skilled in designing scalable applications, developing AI-powered "
        "solutions, and building responsive web applications using modern technologies. Passionate about solving real-world "
        "problems through software engineering and continuously learning emerging technologies. Strong problem-solving, "
        "debugging, and teamwork skills with hackathon experience in developing innovative products."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#888888'), spaceBefore=4, spaceAfter=6))
    
    # TECHNICAL SKILLS
    story.append(Paragraph("TECHNICAL SKILLS", heading_style))
    skills = [
        "<b>Languages:</b> Python, JavaScript, Dart, SQL, HTML, C.",
        "<b>Frameworks &amp; Libraries:</b> FastAPI, Flutter, Node.js, OpenCV, NumPy.",
        "<b>Databases &amp; Tools:</b> MySQL, Firebase, Git, GitHub, VS Code, Postman.",
        "<b>Artificial Intelligence &amp; Machine Learning:</b> Artificial Intelligence, Prompt Engineering, Machine Learning Fundamentals.",
        "<b>Core Computer Science:</b> Data Structures and Algorithms, Operating Systems, Database Management Systems, Computer Networks.",
        "<b>Soft Skills:</b> Problem Solving, Communication, Leadership, Team Collaboration, Analytical Thinking, Time Management."
    ]
    for s in skills:
        story.append(Paragraph(f"● &nbsp; {s}", bullet_style))
        
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#888888'), spaceBefore=4, spaceAfter=6))

    # PROJECTS
    story.append(Paragraph("PROJECTS", heading_style))
    
    # Project 1
    story.append(Paragraph("<b>1. Retail Guard (AI-Based Smart Inventory Management)</b>", body_style))
    p1_bullets = [
        "<b>Tech Stack:</b> JavaScript, Node.js, Applied AI, Database Management Systems.",
        "Engineered an AI-powered SaaS inventory and store management system designed to optimize retail operations.",
        "Developed Algorithmic modules to monitor product expiration dates and track live inventory metrices.",
        "Integrated intelligent predictive analytics to generate data-driven sales insights, enabling shop owners to maximize profit margins.",
        "<b>Recognitions:</b> Deployed and pitched as the core project at the FantomCode Hackathon (RVITM).",
        "<b>Skills:</b> AI, JavaScript, Firebase, Inventory Management, Data Analytics."
    ]
    for b in p1_bullets:
        story.append(Paragraph(f"● &nbsp; {b}", bullet_style))
    story.append(Spacer(1, 4))

    # Project 2
    story.append(Paragraph("<b>2. HomePlate (AI- Based Smart Food Suggestion and Delivery Platform)</b>", body_style))
    p2_bullets = [
        "<b>Tech Stack:</b> Dart, Flutter, JavaScript, REST APIs, Cross-Platform Mobile Development.",
        "Designed and built a hyperlocal, cost-effective food delivery platform tailored for university students seeking home-cooked meals.",
        "Architected scalable backend logic handling user authentication, real-time location-based sorting, and order routing.",
        "<b>Skills:</b> Full Stack Development, Firebase, UI Design.",
        "<b>Recognitions:</b> Successfully adapted into two distinct architectures for competitions:"
    ]
    for b in p2_bullets:
        story.append(Paragraph(f"● &nbsp; {b}", bullet_style))
    story.append(Paragraph("➔ &nbsp; Developed as a <b>web application</b> for the <b>NIRMITH Hackathon</b> at Nitte Meenakshi Institute of Technology.", subbullet_style))
    story.append(Paragraph("➔ &nbsp; Developed as a <b>cross-platform mobile application</b> for the <b>VIBE-A-THON Hackathon</b> at Nitte Meenakshi Institute of Technology.", subbullet_style))
    story.append(Spacer(1, 4))

    # Project 3
    story.append(Paragraph("<b>3. Hotel Management System</b>", body_style))
    p3_bullets = [
        "<b>Tech Stack:</b> Python, SQL, Relational Databases (MySQL).",
        "Built a comprehensive desktop application executing complete hotel operations including booking, dynamic check-in/check-out tracking, and automated bill generation.",
        "Designed a secure relational database schema to persist customer information, room availability states, and menu inventories.",
        "<b>Skills:</b> Python, SQL, Database Design."
    ]
    for b in p3_bullets:
        story.append(Paragraph(f"● &nbsp; {b}", bullet_style))
    story.append(Spacer(1, 4))

    # Project 4
    story.append(Paragraph("<b>4. Inventory Management System</b>", body_style))
    p4_bullets = [
        "<b>Tech Stack:</b> HTML, CSS, JavaScript.",
        "Created a responsive web application facilitating structured stock tracking and interface controls for small scale retail systems.",
        "Improved product organization and inventory tracking.",
        "<b>Skills:</b> HTML, CSS, JavaScript"
    ]
    for b in p4_bullets:
        story.append(Paragraph(f"● &nbsp; {b}", bullet_style))
        
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#888888'), spaceBefore=4, spaceAfter=6))

    # EDUCATION
    story.append(Paragraph("EDUCATION", heading_style))
    story.append(Paragraph("<b>Dr. Ambedkar Institute of Technology, Bengaluru</b> | B.E- CSBS | 2024 - Current", body_style))
    story.append(Paragraph("<b>Kendriya Vidyalaya (CBSE)</b>", body_style))
    story.append(Paragraph("● &nbsp; All India Senior School Certificate Examination (Class 12) | <b>73%</b>", bullet_style))
    story.append(Paragraph("● &nbsp; Secondary School Examination (Class 10) | <b>72.3%</b>", bullet_style))
    
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#888888'), spaceBefore=4, spaceAfter=6))

    # CERTIFICATION
    story.append(Paragraph("CERTIFICATION", heading_style))
    certs = [
        "3-days Bootcamp- The World of Tech 2.0 – Google Developer Groups.",
        "Data Structures &amp; Algorithms (DSA) Session- GeeksforGeeks.",
        "3-days ML Bootcamp- Google Developer Groups.",
        "Python Course for Beginners: Mastering the Essentials- Scaler."
    ]
    for c in certs:
        story.append(Paragraph(f"● &nbsp; {c}", bullet_style))

    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#888888'), spaceBefore=4, spaceAfter=6))

    # HACKATHONS & COMPETITIONS
    story.append(Paragraph("HACKATHONS &amp; COMPETITIONS", heading_style))
    hacks = [
        "FantomCode Hackathon- RV Institute of Technology and Management (RVITM), Project- Retail Guard.",
        "NIRMITH Hackathon- Nitte Meenakshi Institute of Technology, Project- HomePlate (Web Application).",
        "VIBE-A-THON Hackathon- Nitte Meenakshi Institute of Technology, Project- HomePlate (Mobile App)."
    ]
    for h in hacks:
        story.append(Paragraph(f"● &nbsp; {h}", bullet_style))

    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#888888'), spaceBefore=4, spaceAfter=6))

    doc.build(story)
    print("PDF generated successfully:", pdf_filename)

if __name__ == "__main__":
    build_pdf()
