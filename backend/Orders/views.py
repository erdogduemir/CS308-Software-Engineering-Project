from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import HttpResponse
from django.db import transaction
from .models import Order
from .serializers import OrderSerializer

from rest_framework.views import APIView
from django.http import Http404


#This part is for the task Once payment is made and 
#confirmed by the (mock-up) banking entity, an invoice must be shown on the screen
#a pdf copy of the invoice should be emailed to the user. 
#It should be checked and uncommented

#from django.http import HttpResponse
# from django.template.loader import get_template
# from xhtml2pdf import pisa
# from django.core.mail import EmailMessage
# from io import BytesIO
# from django.http import HttpResponse
# from django.template.loader import get_template
# from xhtml2pdf import pisa




# def payment_confirmation(request, order_id):
#     order = Order.objects.get(id=order_id)
#     # Perform payment confirmation logic here
#     # ...
#     # Generate invoice PDF
#     template = get_template('invoice.html')
#     context = {
#         'order': order,
#         'user': request.user,
#     }
#     invoice_html = template.render(context)
#     response = HttpResponse(content_type='application/pdf')
#     response['Content-Disposition'] = 'filename="invoice.pdf"'
#     weasyprint.HTML(string=invoice_html).write_pdf(response)
#     # Send email with invoice PDF attached
#     subject = 'Your Invoice'
#     message = 'Please find your invoice attached.'
#     email = EmailMessage(subject, message, settings.DEFAULT_FROM_EMAIL, [request.user.email])
#     email.attach('invoice.pdf', response.getvalue(), 'application/pdf')
#     email.send()
#     # Render invoice HTML
#     return render(request, 'invoice.html', context)

# def generate_pdf(request, order_id):
#     # Get the order object from the database
#     order = Order.objects.get(id=order_id)
    
#     # Render the HTML template with the order details
#     template = get_template('order_invoice.html')
#     html = template.render({'order': order})
    
#     # Create a PDF file using ReportLab
#     pdf_file = BytesIO()
#     pisa.CreatePDF(BytesIO(html.encode('UTF-8')), pdf_file)
#     pdf = pdf_file.getvalue()
    
#     # Send the PDF as an attachment in an email to the user
#     email = order.customer_email
#     message = "Please find attached a copy of your order invoice."
#     subject = "Order Invoice"
#     email = EmailMessage(subject, message, settings.DEFAULT_FROM_EMAIL, [email])
#     email.attach('order_invoice.pdf', pdf, 'application/pdf')
#     email.send()
    
#     # Return the PDF as an HTTP response to be displayed on the screen
#     response = HttpResponse(pdf, content_type='application/pdf')
#     response['Content-Disposition'] = 'filename="order_invoice.pdf"'
#     return response 


#New One Similar Implementation To Customer and Product I created , I also included path in urls.py

class OrderListView(APIView):
    def get(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDetailView(APIView):
    def get_object(self, pk):
        try:
            return Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        order = self.get_object(pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        order = self.get_object(pk)
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        order = self.get_object(pk)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#OLD ONE 
# @api_view(['GET', 'POST'])
# def order_list(request):
#     if request.method == 'GET':
#         data = Order.objects.all()

#         serializer = OrderSerializer(data, context={'request': request}, many=True)

#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = OrderSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT', 'DELETE','PATCH'])
# def orders_detail(request, pk):
#     try:
#         order = Order.objects.get(pk=pk)
#     except Order.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'PUT':
#         serializer = OrderSerializer(order, data=request.data,context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         order.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# #PATCH only modifies the specific fields that are included in the request.
#     elif request.method == 'PATCH':
#         serializer = OrderSerializer(order, data=request.data, partial=True, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
