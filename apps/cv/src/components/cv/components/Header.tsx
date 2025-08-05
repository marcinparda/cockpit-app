import { TypographyH1 } from '@cockpit-app/shared-react-ui';
import { Phone, Mail, Linkedin, MapPin } from 'lucide-react';

export function Header() {
  return (
    <div className="mb-4">
      <TypographyH1>MARCIN PARDA</TypographyH1>
      <h2 className="text-xl text-gray-600 mb-4">
        Senior Frontend Developer with Python
      </h2>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Phone className="w-4 h-4" />
          <span>+48 576 259 548</span>
        </div>
        <div className="flex items-center gap-1">
          <Mail className="w-4 h-4" />
          <span>marcin98parda@gmail.com</span>
        </div>
        <div className="flex items-center gap-1">
          <Linkedin className="w-4 h-4" />
          <span>www.linkedin.com/in/marcinparda/</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>Warsaw, Poland</span>
        </div>
      </div>
    </div>
  );
}
