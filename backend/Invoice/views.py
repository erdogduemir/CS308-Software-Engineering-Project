from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Invoice
from .serializers import InvoiceSerializer
from django.db import transaction
from rest_framework.views import APIView
from django.http import Http404

#from io import BytesIO
from django.http import HttpResponse
from django.http import FileResponse
import io
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from datetime import datetime

class InvoiceList(APIView):
    def get(self, request, format=None):
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        
        if start_date and end_date:
            start_date = datetime.datetime.strptime(start_date, "%Y-%m-%d").date()
            end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d").date()
            invoices = Invoice.objects.filter(date__range=[start_date, end_date])
        else:
            invoices = Invoice.objects.all()    

        serializer = InvoiceSerializer(invoices, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = InvoiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class InvoiceDetail(APIView):
    def get_object(self, pk):
        try:
            return Invoice.objects.get(pk=pk)
        except Invoice.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        invoice = self.get_object(pk)
        serializer = InvoiceSerializer(invoice)
        # Generate the invoice PDF using reportlab
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        p.drawString(100, 750, "Invoice")
        p.drawString(100, 700, f"Invoice ID: {invoice.invoice_number}")
        p.drawString(100, 650, f"Customer Name: {invoice.customer}")
        p.drawString(100, 600, f"Total Amount: {invoice.total_amount}")
        # Add more details as needed
        p.showPage()
        p.save()
        # Return the PDF as a response
        pdf = buffer.getvalue()
        buffer.close()
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename=invoice_{invoice.id}.pdf'
        response.write(pdf)
        return response
